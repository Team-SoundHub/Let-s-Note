class CursorAnimation {
    constructor(updatePositionCallback) {
      this.updatePositionCallback = updatePositionCallback;
      this.lastPosition = { x: 0, y: 0 };
      this.nextPosition = { x: 0, y: 0 };
      this.animating = false;
    }
  
    updatePosition(x, y) {
      this.nextPosition = { x, y };
      if (!this.animating) {
        this.animating = true;
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  
    animate() {
      // 2차 베지어 곡선을 위한 간단한 계산 (선형 보간을 사용)
      const t = 0.2; // t는 0과 1 사이의 값이며, 이동의 부드러움을 조절
      const x = (1 - t) * this.lastPosition.x + t * this.nextPosition.x;
      const y = (1 - t) * this.lastPosition.y + t * this.nextPosition.y;
  
      this.updatePositionCallback(x, y);
      this.lastPosition = { x, y };
  
      if (x !== this.nextPosition.x || y !== this.nextPosition.y) {
        requestAnimationFrame(this.animate.bind(this));
      } else {
        this.animating = false;
      }
    }
  }
  
  export default CursorAnimation;
  