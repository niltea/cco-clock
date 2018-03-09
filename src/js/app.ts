class Hand {
  private isOK: boolean = false;
  private element: HTMLElement;
  private type: string;
  private currentPosition: number;
  private angle: number;

  constructor(type, elementId) {
    this.type = type;
    this.element = document.getElementById(elementId);
    if (!this.element) {
      return;
    }
    this.isOK = true;
  }

  setAngle(current:number, max:number) {
    this.currentPosition = (current < max) ? current : current - max;
    // 傾きの角度を求める
    const angle = (360 / max) * current;
    // 傾きが前回と変わっていなければ処理軽減のため中断
    if (angle === this.angle) return;
    // 角度を保存しておく
    this.angle = angle;

    // styleを設定
    this.element.style.transform = `rotate(${angle}deg)`;
  }
}

const hands = {
  hour: undefined,
  min: undefined,
  sec: undefined,
};
const init = () => {
  hands.hour = new Hand('hour', 'hand--hour');
  hands.min = new Hand('min', 'hand--min');
  hands.sec = new Hand('sec', 'hand--sec');

  setInterval(setHands, 500);
};

const setHands = () => {
  const now = new Date();
  hands.hour.setAngle(now.getHours(), 12);
  hands.min.setAngle(now.getMinutes(), 60);
  hands.sec.setAngle(now.getSeconds(), 60);
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
