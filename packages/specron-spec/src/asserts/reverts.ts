/**
 * 
 */
function isRevertError(e, message?: string) {
  const isRevert = String(e).search('revert') >= 0 || (e.message !== undefined && e.message.search('revert') >= 0);
  if(isRevert && message !== undefined) {
    return String(e).search(message) >= 0 || (e.message !== undefined && e.message.search(message) >= 0);
  }
  return isRevert;
}

/**
 * 
 */
export default function reverts (fn: () => any, message?: string) {
  try {
    const res = fn();
    if (res instanceof Promise) {
      return res.then(() => false).catch((e) => isRevertError(e, message));
    } else {
      return false;
    }
  } catch (e) {
    return isRevertError(e, message);
  }
}
