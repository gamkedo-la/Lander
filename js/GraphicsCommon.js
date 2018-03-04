function drawBitmapCenteredWithRotation(useBitmap, atX,atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.font = "10px Arial"
	canvasContext.fillText(showWords, textX, textY);
}

// Need to make a function that accepts font as input? Or is it better to standardise on small , mid , large?

function colorTextLarge(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.font = "25px Arial";
	canvasContext.fillText(showWords, textX, textY);
}

function colorTextMedium(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.font = "17px Arial";
	canvasContext.fillText(showWords, textX, textY);
}

