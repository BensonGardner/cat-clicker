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
    
    adminShow : false
}


// This is our "octopus"/controller/whatever.
var octopus = {
		
    currentCat: '',  
  
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

    // octopus.select(cat) is called by the view when a cat
    // is selected. Octopus.select(cat) sets currentCat 
    // to that piece of the data model which was selected 
    // in the view, then tags the view object to update 
    // the main display.
    select: function(catIndex) {
        octopus.currentCat = data.cats[catIndex];
        view.featured.display(octopus.currentCat);
        octopus.currentCat.id = catIndex;
    },
    
    // Increase count for the selected cat if clicked.
    // incrementClicks() is called by an event listener
    // which is inserted by the view. Make the circle
    // for the clicking show up.
    incrementClicks: function() {
        octopus.currentCat.count++;
        view.featured.displayNewCount();
    },
    
    toggleAdmin: function() {
        data.adminShow = !data.adminShow;
        view.admin.toggleAdminView();
        if (data.adminShow = true) {
            // update the form values. 
            // Another way to handle this...
            // Have this call a separate octopus function that
            // sends the current cat data to the view 
            // for rerendering the form. or just 
            // changing the values. 
            // pAss it a cat object, then update each 
            // value in turn.
            
            // Or, instead o fcalling tha there, jus thave it happen 
            // every single time you choose a cat.
        }
    },
        
    alterCat: function() {
        // This function is called by the view (form)
        // when Save is clicked. It takes data from the form
        // into the octopus, then takes that same data in the 
        // octopus and pushes it into the data model. It uses
        // the currentCat.id to figure out which part of the 
        // cats.data array to alter.
        
        var inputForm = $('#adminPanelForm'),
            inputFormData = inputForm[0];
        octopus.currentCat.name = inputFormData[0].value;
        octopus.currentCat.pic = inputFormData[1].value;
        octopus.currentCat.count = inputFormData[2].value;        
        data.cats[octopus.currentCat.id] = octopus.currentCat;
        view.featured.display(octopus.currentCat);
        octopus.toggleAdmin();
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
        
        // Consider whether these var definitions inside the function are not 
        // what we want. Maybe we need to access these things later? We could
        // make them properties of view.admin.init, or we could define or declare
        // them elsewhere in view. 
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
                saveButton = '<button id="saveButton" type="button" name="save-button">Save</button>';
            $(adminPanel).append(nameLabel + nameField + picLabel + picField + countLabel + countField + saveButton);
            console.log(saveButton);
            $('#saveButton').click(octopus.alterCat);
          
            
            // Show the panel ...
            $(adminButton).click(function() {
                // ... with code here
                octopus.toggleAdmin();
                
            })
        },
    
    toggleAdminView: function(){
         
        $('form').toggle();
              
    },
    
    }
    
};
                                             
octopus.init();                                      
        