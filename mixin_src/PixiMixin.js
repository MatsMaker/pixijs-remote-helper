import runHooks from "./runHooks";

const beforeRender = Symbol("beforeRender");
const afterRender = Symbol("afterRender");

export default class PixiMixin {

  constructor(pixiInstance) {
    this._pixiInstance = pixiInstance;
    this._unpatched = {};
    this._hooks = {
      [beforeRender]: [],
      [afterRender]: []
    };
  }

  get hooksTypes() {
    return {
      "beforeRender": beforeRender,
      "afterRender": afterRender,
    }
  }

  enable() {
    if (!this._unpatched.CanvasRenderer) {
      this.patch("CanvasRenderer");
    }
    if (!this._unpatched.WebGLRenderer) {
      this.patch("WebGLRenderer");
    }
  }

  disable() {
    for (const [renderer, renderMethod] of Object.entries(this._unpatched)) {
      this._pixiInstance[renderer].prototype.render = renderMethod;
    }
    this._unpatched = {};
  }

  /**
   * Path the Renderer.render method to get a hold of the stage object(s)
   */
  patch(renderer) {
    if (this._unpatched[renderer]) {
      throw renderer + " already patched";
      return;
    }
    const Renderer = this._pixiInstance[renderer];
    if (Renderer && Renderer.prototype.render) {
      const renderMethod = Renderer.prototype.render;
      const self = this;
      Renderer.prototype.render = function (container, ...args) {
        runHooks(self._hooks[beforeRender], container, this);
        const result = renderMethod.apply(this, [container, ...args]);
        runHooks(self._hooks[afterRender], container, this);
        return result;
      };
    }
  }

  /**
 * @param {string} type 'beforeRender', 'afterRender'
 * @param {Function} callback
 * @param {number} ms
 * @return {Function} unregister
 */
  registerHook(type, callback, ms = 0) {
    const hook = {
      callback,
      throttle: ms,
      skip: false
    };
    this._hooks[type].push(hook);
    return () => {
      const index = this._hooks[type].indexOf(hook);
      if (index !== -1) {
        this._hooks[type].splice(index, 1);
      }
    };
  }

}