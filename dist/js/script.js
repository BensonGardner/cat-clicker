// This is our data model.
var cats = [
    {
        name: 'Jennifer',
        pic:  'images/kitten-autumn-500.jpg',
    }, 
    {
        name: 'Mark',
        pic: 'images/cat-grey-500.jpg'
    },
    { 
        name: 'deShawn',
        pic: 'images/cat-sleeping.jpg'
    },
    {
        name: 'Steve-O',
        pic: 'images/cat-hairless.jpg'      
    },
    {
        name: 'Akhila',
        pic: 'images/cat-with-pita.jpg'
    }
];


// This is our "octopus"/controller/whatever.
var octopus = {
		
  	currentCat: '',  
  
    // octopus.init() sets everything up. It adds a 
    // count property to each of the cats in the data array,
    // and then sends the data model to the view object to 
    // create the view.
    init: function() {
        for (i = 0; i < cats.length; i++) {
            cats[i].count = 0;
        }
        console.log(cats);
        view.menu.init(cats);
        view.featured.init();
    },

    // octopus.select(cat) is called by the view when a cat
    // is selected. Octopus.select(cat) sets currentCat 
    // to that piece of the data model which was selected 
    // in the view, then tags the view object to change 
    // the main display and the menu styling.
    select: function(cat) {
        console.log(cat + " is da cat");
        octopus.currentCat = cat;
        view.featured.display(octopus.currentCat);
        view.menu.highlight(octopus.currentCat);
    },
    
    // Increase count for the selected cat if clicked.
    // incrementClicks() is called by an event listener
    // which is inserted by the view. Make the circle
    // for the clicking show up.
    incrementClicks: function() {
        octopus.currentCat.count++;
        console.log(octopus.currentCat.count);
        view.featured.displayNewCount();
    }
    
};


var view = {

// featured is the main area of the website
    featured : {
 
        // featured.display is called
        // to display a particular cat's 
        // name, pic, and click count.
        display: function(cat) {
            $('.cat-box').css('display', 'inline');
            $('.cat-name').text = cat.name;
            $('.cat-pic').attr('src', cat.pic);
            $('.reward').text(cat.count);
        },
        
        // featured.init puts an event listener on the div
        // containing the cat pic, to increment the current cat's
        // click count.
        init: function() {
            $('.cat-pic').click(octopus.incrementClicks);
        },

        displayNewCount: function() {
            var cat = octopus.currentCat;
            console.log(cat);
            console.log(cat.count);
            $('.reward').text(cat.count);
        }
        
    },
    
    
// menu is the list of cats
    menu: {
      
        // Change styling when a cat is selected
        highlight: function(currentCat) {
            // later do this
        },
        
        init: function(cats) {
            console.log(cats);
            for (i = 0; i < cats.length; i++) {
                console.log(cats[i]);
                var menuHTML = '<span class="menu-link" id="' +
                    i + '"><a href="#">' + cats[i].name + '</a><br><br></span>';
                
                $('#navigation').append(menuHTML);
                
                // Put the event listener on the menu links to select
                // desired cat. Using .call() because we need to pass an argument to the select function
                $('#' + i).click(function() {
                    console.log(Number(this.id));
                    console.log(cats[Number(this.id)]);
                    octopus.select.call(octopus, cats[Number(this.id)]);
                });
            }
        }
    }                                             
};
                                             
octopus.init();                                      
        