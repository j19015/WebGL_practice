import * as THREE from "three";

/**
 * BasicView は、Three.js のプロジェクトを簡単にセットアップすることができるクラスです。
 * シーン、カメラ、レンダラー、ビューポートのシンプルなテンプレートを提供しています。
 */
export class BasicView {
  /** シーンオブジェクトです。 */
  public scene: THREE.Scene;
  /** カメラオブジェクトです。(PerspectiveCamera のみ) */
  public camera: THREE.PerspectiveCamera;
  /** レンダラーオブジェクトです。(WebGL のみ) */
  public renderer: THREE.WebGLRenderer;
  /** HTML　要素です。 */
  public containerElement: HTMLElement;

  constructor() {
    this.containerElement = document.createElement("div");
    document.body.appendChild(this.containerElement);


  }

  /**
   * レンダリングを開始します。
   */
  public startRendering(): void {
    this.update();
  }

  /**
   * レンダリングを即座に実行します。
   */
  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * 毎フレーム実行される関数です。
   */
  public onTick(): void {
    // to overlide
  }

  /**
   * ウインドウリサイズ時のイベントハンドラーです。
   * @param event
   */
  protected handleResize(event: UIEvent): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * requestAnimationFrame で呼び出されるメソッドです。
   * @private
   */
  protected update(): void {
    requestAnimationFrame(this.update.bind(this));

    this.onTick();
    this.render();
  }
}
