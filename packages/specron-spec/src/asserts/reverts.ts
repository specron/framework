/**
 * 
 */
function isRevertError(e) {
  return e === 'revert' || e.message.search('revert') >= 0;
}

/**
 * 
 */
export default function reverts (fn: () => any) {
  try {
    const res = fn();
    if (res instanceof Promise) {
      return res.then(() => false).catch((e) => isRevertError(e));
    } else {
      return false;
    }
  } catch (e) {
    return isRevertError(e);
  }
}
