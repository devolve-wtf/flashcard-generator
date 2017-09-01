function ClozeCard(text, cloze) {
    this.cloze = cloze;
    this.partialText = text.replace(cloze, '...');
    this.fullText = text;
}

ClozeCard.prototype.readCard = function() {
    console.log('--');
    console.log(this.partialText);
}

module.exports = ClozeCard;