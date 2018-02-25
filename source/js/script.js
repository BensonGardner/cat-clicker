var clickZone = $('#clickZone'),
    cats = [];

// Cat constructor. This creates a 
// cat object and pushes it into the main
// area of the page. It also creates a menu
// link.
// The Title case method was found at 
// https://stackoverflow.com/questions/5086390/jquery-title-case

var Cat = function(name, picture) {
    this.clicks = 0;
    this.name = name.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
    var nameHTML = '<div class="cat-name"><h2>' + this.name +
            '</h2></div>',
        
        rewardHTML = '<div class="reward" id="show-' + this.name + 
            '-reward"><span id="' + this.name + 
            '-reward-text">' + this.clicks + '</span></div>', 
        
        picHTML = '<div class="cat-pic" id="show-' + this.name + '-pic"><img alt="cat" src="' + 
            picture + '"></div>',
        
        menuHTML = '<a class="menu-link" href="#" id="show-' + this.name + '">' + this.name + '</a></br>';
    
    clickZone.append('<div class="cat-box" id="box-show-' + this.name + '">' + nameHTML + picHTML + rewardHTML);
    
    cats.push(this);
    $('#navigation').append(menuHTML);
};

// Add the count function. It takes each cat's
// circle as an argument, then increments the 
// count when it is clicked.
Cat.prototype.count = function(circle) {
    this.clicks++;
    circle.style.display = 'inline';
    circle.innerHTML = '<span id="' + this.name + '-reward-text">' +    this.clicks + '</span>';
};

var jen = new Cat('jennifer', 'images/kitten-autumn-500.jpg'),
    mark = new Cat('Mark', 'images/cat-grey-500.jpg');

// Add the click-to-select functionality to the menu,
// and the click-to-count functionality to the cat pictures
// that the menu brings up.
for (i = 0; i < cats.length; i++) {
    (function(i) {
        var catCircle = document.getElementById('show-' + 
            cats[i].name + '-reward');
        $('#show-' + cats[i].name).click(function() {
            $('.cat-box').css('display', 'none');
            $('#box-' + this.id).css('display', 'inline');
            $('#' + this.id + '-pic').click(function() {
                cats[i].count.call(cats[i], catCircle);
            });
        })
    }).call(cats[i], i);
}
