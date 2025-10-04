import './styles.css';

const root = document.getElementById('app');
const themeBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeBtn.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersLight =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');
}

themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text != null) element.textContent = text;
  return element;
}

class Calculator {
  constructor(container) {
    this.container = container;
    this.accumulator = 0;
    this.currentInput = '0';
    this.pendingOperation = null;
    this.isReplacingInput = false;
    this.render();
  }

  render() {
    const calculator = createElement('div', 'calculator');
    this.display = createElement('div', 'display', '0');
    const keys = createElement('div', 'keys');

    const makeKey = (label, cls, onClick) => {
      const btn = createElement('button', `key ${cls || ''}`.trim(), label);
      btn.addEventListener('click', onClick);
      keys.appendChild(btn);
    };

    makeKey('AC', '', () => this.clearAll());
    makeKey('+/-', '', () => this.toggleSign());
    makeKey('%', '', () => this.percent());
    makeKey('÷', 'key--op', () => this.setOperation('/'));

    makeKey('7', '', () => this.inputDigit('7'));
    makeKey('8', '', () => this.inputDigit('8'));
    makeKey('9', '', () => this.inputDigit('9'));
    makeKey('×', 'key--op', () => this.setOperation('*'));

    makeKey('4', '', () => this.inputDigit('4'));
    makeKey('5', '', () => this.inputDigit('5'));
    makeKey('6', '', () => this.inputDigit('6'));
    makeKey('−', 'key--op', () => this.setOperation('-'));

    makeKey('1', '', () => this.inputDigit('1'));
    makeKey('2', '', () => this.inputDigit('2'));
    makeKey('3', '', () => this.inputDigit('3'));
    makeKey('+', 'key--op', () => this.setOperation('+'));

    const zero = createElement('button', 'key key--span-2', '0');
    zero.addEventListener('click', () => this.inputDigit('0'));
    keys.appendChild(zero);
    makeKey(',', '', () => this.inputDecimal());
    makeKey('=', 'key--op', () => this.equals());

    calculator.appendChild(this.display);
    calculator.appendChild(keys);
    this.container.appendChild(calculator);
  }

  updateDisplay() {
    this.display.textContent = this.currentInput.replace('.', ',');
  }

  clearAll() {
    this.accumulator = 0;
    this.currentInput = '0';
    this.pendingOperation = null;
    this.isReplacingInput = true;
    this.updateDisplay();
  }

  inputDigit(digit) {
    if (this.isReplacingInput) {
      this.currentInput = digit === '0' ? '0' : digit;
      this.isReplacingInput = false;
    } else {
      if (this.currentInput === '0') this.currentInput = digit;
      else this.currentInput += digit;
    }
    this.updateDisplay();
  }

  inputDecimal() {
    if (this.isReplacingInput) {
      this.currentInput = '0.';
      this.isReplacingInput = false;
    } else if (!this.currentInput.includes('.')) {
      this.currentInput += '.';
    }
    this.updateDisplay();
  }

  toggleSign() {
    if (this.currentInput === '0') return;
    if (this.currentInput.startsWith('-')) {
      this.currentInput = this.currentInput.slice(1);
    } else {
      this.currentInput = `-${this.currentInput}`;
    }
    this.updateDisplay();
  }

  percent() {
    const value = parseFloat(this.currentInput || '0');
    this.currentInput = (value / 100).toString();
    this.updateDisplay();
  }

  setOperation(op) {
    const inputValue = parseFloat(this.currentInput || '0');
    if (this.pendingOperation != null && !this.isReplacingInput) {
      this.accumulator = this.compute(this.accumulator, inputValue, this.pendingOperation);
    } else if (this.pendingOperation == null) {
      this.accumulator = inputValue;
    }
    this.pendingOperation = op;
    this.isReplacingInput = true;
    this.currentInput = this.sanitizeNumber(this.accumulator);
    this.updateDisplay();
  }

  equals() {
    const inputValue = parseFloat(this.currentInput || '0');
    if (this.pendingOperation == null) {
      this.accumulator = inputValue;
    } else {
      this.accumulator = this.compute(this.accumulator, inputValue, this.pendingOperation);
      this.pendingOperation = null;
    }
    this.currentInput = this.sanitizeNumber(this.accumulator);
    this.isReplacingInput = true;
    this.updateDisplay();
  }

  compute(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return b === 0 ? NaN : a / b;
    return b;
  }

  sanitizeNumber(num) {
    const str = String(Number.isFinite(num) ? num : 'Error');
    if (str === 'Error') return str;
    const fixed = Number(num.toPrecision(12)).toString();
    return fixed;
  }
}

new Calculator(root);
