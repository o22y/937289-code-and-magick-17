'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var HEADER_X = 120;
var MOVE = 10;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var BAR_TEXT_X = CLOUD_X + MOVE * 5;
var betweenColumn = 90;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var headerText = function (ctx, text, y, color) {
  ctx.fillStyle = color;
  ctx.font = '16px, PT Mono';
  ctx.fillText(text, HEADER_X + MOVE , MOVE * y);
};

var barText = function (ctx, text, index, times, y, score, color, maxTime) {
  ctx.fillStyle = color;
  ctx.font = '16px, PT Mono';
  ctx.fillText(text, HEADER_X + betweenColumn * index + MOVE * 5, CLOUD_Y + CLOUD_HEIGHT - MOVE * y - ((BAR_HEIGHT * times[index]) / maxTime - 10) * score);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var barColor = function (ctx, index, players) {
  if (players[index] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'rgba(27, 54, 228,' + (Math.random() * (1 - 0.2) + 0.2) + ')';
  }
};

var renderBar = function (ctx, index, times, maxTime, names) {
  barColor(ctx, index, names);
  ctx.fillRect(CLOUD_X + betweenColumn * index + TEXT_WIDTH + MOVE * 2, CLOUD_Y + CLOUD_HEIGHT - MOVE * 4, 40, -(BAR_HEIGHT * times[index]) / maxTime);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + MOVE, CLOUD_Y + MOVE, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, i, times, maxTime, names);
    barText(ctx, names[i], i, times, 2, 0, 'black', maxTime);
    barText(ctx, Math.floor(times[i]), i, times, 6, 1, 'black', maxTime);
  }
};
