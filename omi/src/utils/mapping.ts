/**
 * mappingjs v2.0.0 by dntzhang
 * Objects mapping for javascript. Omi MVVM's best partner.
 */

type MappingRule = Record<string, unknown>;
type AnyObject = Record<string, unknown>;

function isArray(obj: unknown): obj is unknown[] {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject(obj: unknown): obj is AnyObject {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function equalArr(arrA: string[], arrB: string[]): boolean {
  for (let i = 0; i < arrB.length; i++) {
    if (arrA[i] !== arrB[i] && !(arrA[i] === '*' && !isNaN(Number(arrB[i])))) {
      return false;
    }
  }
  return true;
}

function arrayMapping(from: unknown[], to: unknown[], rule: MappingRule, path: string): void {
  if (from.length < to.length) {
    to.length = from.length;
  }
  from.forEach((item, index) => {
    if (isArray(item)) {
      to[index] = to[index] || [];
      arrayMapping(item, to[index] as unknown[], rule, `${path}[${index}]`);
    } else if (isObject(item)) {
      to[index] = objMapping(item, to[index] as AnyObject, rule, `${path}[${index}]`);
    } else {
      to[index] = item;
    }
  });

  if (rule) {
    Object.keys(rule).forEach((key) => {
      const arr = key.replace(/]/g, '').replace(/\[/g, '.').split('.');
      const pathArr = path.replace(/]/g, '').replace(/\[/g, '.').split('.');
      const dl = arr.length - pathArr.length;
      if (dl === 1 && equalArr(arr, pathArr)) {
        const val = rule[key];
        (to as AnyObject)[arr[arr.length - 1]] = typeof val === 'function' ? val.call(from) : val;
        delete rule[key];
      }
    });
  }
}

function objMapping(from: AnyObject, to: AnyObject | undefined, rule: MappingRule, path: string): AnyObject {
  const res: AnyObject = to || {};
  Object.keys(from).forEach((key) => {
    const obj = from[key];
    if (isArray(obj)) {
      res[key] = res[key] || [];
      arrayMapping(obj, res[key] as unknown[], rule, `${path}.${key}`);
    } else if (isObject(obj)) {
      res[key] = res[key] || {};
      objMapping(obj, res[key] as AnyObject, rule, `${path}.${key}`);
    } else {
      res[key] = obj;
    }
  });

  if (rule) {
    Object.keys(rule).forEach((key) => {
      const arr = key.replace(/]/g, '').replace(/\[/g, '.').split('.');
      const pathArr = path.replace(/]/g, '').replace(/\[/g, '.').split('.');
      if (arr.length - pathArr.length === 1 && equalArr(arr, pathArr)) {
        const val = rule[key];
        res[arr[arr.length - 1]] = typeof val === 'function' ? val.call(from) : val;
        if (arr.indexOf('*') === -1) {
          delete rule[key];
        }
      }
    });
  }

  return res;
}

/**
 * Map properties from one object to another with optional transformation rules.
 */
function mapping(from: AnyObject, to?: AnyObject, rule?: MappingRule): AnyObject {
  const tempRule = Object.assign({}, rule);
  const res: AnyObject = to || {};

  Object.keys(from).forEach((key) => {
    const obj = from[key];
    if (isArray(obj)) {
      res[key] = res[key] || [];
      arrayMapping(obj, res[key] as unknown[], tempRule, key);
    } else if (isObject(obj)) {
      res[key] = res[key] || {};
      objMapping(obj, res[key] as AnyObject, tempRule, key);
    } else {
      res[key] = obj;
    }
  });

  if (rule) {
    Object.keys(tempRule).forEach((key) => {
      const arr = key.replace(/]/g, '').replace(/\[/g, '.').split('.');
      if (arr.length === 1) {
        const val = tempRule[key];
        res[key] = typeof val === 'function' ? val.call(from) : val;
        delete tempRule[key];
      }
    });
  }

  return res;
}

/** Backward compatibility alias. */
mapping.auto = mapping;

export default mapping;
