/**
 * 
 */
function isRevertError(e, message?: string) {
  const isRevert = String(e).includes('revert') || (e.message !== undefined && e.message.includes('revert'));
  if(isRevert && message !== undefined) {
    return String(e).includes(message) || (e.message !== undefined && e.message.includes(message));
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
