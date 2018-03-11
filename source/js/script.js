// This is our data model.
var data = {
    
    cats : [
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
    ],
    
    // Reflect whether the Admin panel is showing.
    adminShow : false
}


// This is our "octopus"/controller/whatever.
var octopus = {
		
    // octopus.init() sets everything up. It adds a 
    // count property to each of the cats in the data array,
    // and then sends the data model to the view object to 
    // create the view.
    init: function() {
        for (i = 0; i < data.cats.length; i++) {
            data.cats[i].count = 0;
            data.cats[i].id = i;
        }
        view.menu.init(data.cats);
        view.featured.init();
        view.admin.init();
    },

    // This value tracks which cat featured in the 
    // main part of the screen.
    currentCat: '',  
    
    // The octopus.select(cat) function is called by 
    // the view when a cat is selected. 
    // It sets currentCat to the correct piece of the data 
    // model, then tags the view object to update 
    // the main display.
    select: function(catIndex) {
        octopus.currentCat = data.cats[catIndex];
        view.featured.display(octopus.currentCat);
        octopus.currentCat.id = catIndex;
    },
    
    // Increase count for the selected cat if clicked.
    // incrementClicks() is called by an event listener
    // which is inserted by the view. It makes the circle
    // for the clicking show up once the click count is 
    // at least 1.
    incrementClicks: function() {
        octopus.currentCat.count++;
        view.featured.displayNewCount();
    },
    
    // toggleAdmin() is called by the event listener on 
    // the Admin button. This function sets the
    // data.adminShow property to reflect whether 
    // it's showing, and calls 
    // view.admin.toggleAdminView() to alter the display.
    toggleAdmin: function() {
        data.adminShow = !data.adminShow;
        view.admin.toggleAdminView();
    },
        
    // The alterCat() function is called by the 
    // form (part of the view object) when the Save button 
    // is clicked. 
    // It brings the data entered into the form into 
    // the octopus, then pushes that same data from 
    // the octopus into the data model, using the 
    // currentCat.id variable to figure out which part of the 
    // cats.data array in the model to alter.
        
    alterCat: function() {        
        var inputForm = $('#adminPanelForm'),
            inputFormData = inputForm[0];
        octopus.currentCat.name = inputFormData[0].value;
        octopus.currentCat.pic = inputFormData[1].value;
        octopus.currentCat.count = inputFormData[2].value;        
        data.cats[octopus.currentCat.id] = octopus.currentCat;
        view.featured.display(octopus.currentCat);
        octopus.toggleAdmin();
        view.menu.render(data.cats);
    }
    
};


var view = {

    // featured is the main area of the website
    featured : {
 
        // featured.display is called by octopus.select(cat)
        // to display a particular cat's 
        // name, pic, and click count.
        display: function(cat) {
            $('.cat-box').css('display', 'inline');
            $('.cat-name').text(cat.name);
            $('.cat-pic').attr('src', cat.pic);
            $('.reward').text(cat.count);
            
            // Update the values for the input form
            $('#name-input').attr('value', cat.name);
            $('#pic-input').attr('value', cat.pic);
            $('#count-input').attr('value', cat.count);
        },
        
        // featured.init puts an event listener on the div
        // containing the cat pic, to increment the current cat's
        // click count.
        init: function() {
            $('.cat-pic').click(octopus.incrementClicks);
        },

        displayNewCount: function() {
            var cat = octopus.currentCat;
            $('.reward').text(cat.count);
            $('#count-input').attr('value', cat.count);
        }
        
    },
    
    
// menu is the list of cats
    menu: {
        
        init: function(cats) {
            view.menu.render(cats);
        },

        render: function(cats) {
            
            $('#navigation').empty();
            
            for (i = 0; i < cats.length; i++) {
                var menuHTML = '<li id="' +
                    i + '"><a href="#">' + cats[i].name + '</a><br><br></li>';
                
                $('#navigation').append(menuHTML);
                
                // Put the event listener on the menu links to select
                // desired cat. Using .call() because we need to pass an argument to the select function
                $('#' + i).click(function() {
                    octopus.select.call(octopus, this.id);
                });
            }
        }
    },
    
    admin: {
        
        selectedCat: '',
        
        // admin.init shoves the admin stuff into the 
        // DOM

        // This is hard to read, and if I had time and
        // reason to improve it, the obvious next step 
        // would be to make the adminPanel into one
        // long HTML string that we append to the
        // DOM all at once. 
        
        init: function() {
            var adminButton = document.createElement('button');
            adminButton.textContent = 'Admin';
            $('#admin').append(adminButton);
            var adminPanel = document.createElement('form');
            $(adminPanel).css('class', 'panel');
            $('#admin').append(adminPanel);
        //    $(adminPanel).attr('method','POST');
            $(adminPanel).attr('id', 'adminPanelForm');
            var labels = document.createElement('div');
            $(labels).css('class', 'labels');
            var inputs = document.createElement('input');
            $(inputs).css('class', 'inputs');
            $(adminPanel).append(labels);
            var nameLabel = '<label for="name">Name</label>',
                nameField = '<input type="text" id="name-input" value=' + octopus.currentCat.name + ' name="name-input">',
                picLabel = '<label for="pic-input">Picture URL</label>',
                picField = '<input type="text" value=' + octopus.currentCat.pic + ' id="pic-input" name="pic-input">',
                countLabel = '<label for="count-input">Count</label>',
                countField = '<input type="text" id="count-input" value=' + octopus.currentCat.count + ' name="count-input">',
                saveButton = '<button id="saveButton" type="button" name="save-button">Save</button>',
                cancelButton = '<button id="cancelButton" type="reset" name="cancel-button">Cancel</button>';
            $(adminPanel).append(nameLabel + nameField + picLabel + picField + countLabel + countField + saveButton + cancelButton);
            
            $('#saveButton').click(octopus.alterCat);
            $('#cancelButton').click(octopus.toggleAdmin);
            
            // Toggle the display of the adminPanel
            // When the Admin button is pressed, 
            // call the octopus's toggleAdmin function
            // to do the needed work.
            $(adminButton).click(function() {
                octopus.toggleAdmin();                
            })
        },
    
        
    // One of the things that octopus.toggleAdmin()
    // does, after being called by the Admin button's
    // event listener, is call the following function 
    // which does the work of toggling the display property 
    // of the Admin form. 
    toggleAdminView: function(){
         
        $('form').toggle();
              
    },
    
    }
    
};
                                             
octopus.init();                                      
        