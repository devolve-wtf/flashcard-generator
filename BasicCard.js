function BasicCard(front, back) {
    this.front = front;
    this.back = back;
}

BasicCard.prototype.readCard = function() {
    console.log('--');
    console.log('The front says ' + this.front);
    console.log('The back says ' + this.back);
}

module.exports = BasicCard;