import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
// import "@babylonjs/loaders/glTF";
import {
  Engine,
  Scene,
  Vector3,
  VirtualJoysticksCamera,
  SceneLoader,
  // Camera,
  // Light,
  // Animation,
} from "@babylonjs/core";
// import "@babylonjs/loaders/OBJ";

class App {
  // Initialization
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;

  // Create canvas
  private _createCanvas(): HTMLCanvasElement {
    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "canvas";
    document.body.append(canvas); // Add the canvas into the HTML body
    return canvas;
  }

  // Create scene
  private _createScene(canvas: HTMLCanvasElement, engine: Engine): Scene {
    const scene = new Scene(engine);
    const camera = new VirtualJoysticksCamera(
      "vrCam",
      new Vector3(0, 1, 0),
      scene
    );
    camera.checkCollisions = true;
    // camera.speed = 0.2;
    // camera.angularSensibility = 0.2;
    camera.attachControl(canvas, true);

    SceneLoader.Append("./assets/", "building.babylon", scene, (scene) => {
      scene.activeCamera = camera;
    });

    return scene;
  }

  // Constructor
  constructor() {
    // Create canvas
    this._canvas = this._createCanvas();

    // Init babylon scene and engine
    this._engine = new Engine(this._canvas, true);
    this._scene = this._createScene(this._canvas, this._engine);

    // Hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      // Ctrl+Alt+Shift+I
      if (ev.ctrlKey && ev.altKey && ev.shiftKey && ev.key === "I") {
        if (this._scene.debugLayer.isVisible()) {
          this._scene.debugLayer.hide();
        } else {
          this._scene.debugLayer.show();
        }
      }
    });

    // Run the main render loop
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
  }
}

// Entry point
new App();
