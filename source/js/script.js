var clickZone = $('#clickZone'),
    cats = [];

var Cat = function(name, picture) {
    // var thisCat = this;
    // console.log(thisCat);
    this.clicks = 0;
    this.name = name;
    var nameHTML = '<div class="cat-name"><h2>' + name +
            '</h2></div>',
        
        rewardHTML = '<div class="reward" id="' + name + 
            '-reward"><span id="' + name + 
            '-reward-text">' + this.clicks + '</span></div>', 
        
        picHTML = '<div class="cat-pic" id="' + name + '-pic"><img alt="cat" src="' + 
            picture + '"></div>';
    
    clickZone.append('<div class="cat-box" id="' + name + '">' + nameHTML + picHTML + rewardHTML);
    
    var thisCatCircle = document.getElementById(name + '-reward');
    console.log(thisCatCircle.style);
    var thisCatCount = this.count.bind(this, thisCatCircle);
    
    //I"m not sure what "this" would be in the next line.
    // Maybe I should be using bind or call for this.
    // I  believe it's working not sure.
    // $('#' + this.name).click(console.log(thisCat));
    $('#' + this.name).click(thisCatCount);
    cats.push(this);
};

Cat.prototype.count = function(circle) {
        console.log('this is ' + this);
        console.log('this.name is ' + this.name);
        console.log(circle);
    
        this.clicks++;
        circle.style.display = 'inline';
        circle.innerHTML = '<span id="' + this.name + '-reward-text">' + this.clicks + '</span>';
        this.rewardText = document.getElementById(this.name + '-reward-text');
    
  /*      circle.style.top = (cats.indexOf[this.name] * 2) + 'vw'; */
    
      /*  switch (this.clicks) {  
            case 1: 
                circle.style.right = '10vw';
                break;
            case 10: 
                circle.style.right = '8vw';
                break;
            case 100: 
                circle.style.right = '6vw';
                break; 
            default:
                break;
        }*/
};

var jen = new Cat('Jennifer', 'images/kitten-autumn-500.jpg'),
    mark = new Cat('Mark', 'images/cat-grey-500.jpg');
// someday push into array automatically
    



