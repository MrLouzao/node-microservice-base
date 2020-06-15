let instance;


/**
 * Get unique object pool instance
 */
function getObjectPool() {
  if (!instance) {
    instance = {};
  }
  return instance;
}


function addObjectToPool(name, obj) {
  const pool = getObjectPool();
  pool[name] = obj;
}


function removeObjectFromPool(name) {
  const pool = getObjectPool();
  delete pool[name];
}


function clearObjectPool() {
  let pool = getObjectPool();
  pool = undefined;
}


module.exports = {
  getObjectPool,
  addObjectToPool,
  removeObjectFromPool,
  clearObjectPool
};
