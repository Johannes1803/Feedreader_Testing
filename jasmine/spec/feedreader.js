/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* Place all  tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* First test suite for RSS Feeds
    */
    describe('RSS Feeds', function() {
        /* Test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.*/
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test: Loop through each feed
         * in the allFeeds object and ensure it has a URL defined
         * and that the URL is not empty.
         */

        it('all have valid URLs', function(){
            // loop over array of feeds
            for (var i =0; i< allFeeds.length; i++){
                (function(testUrl) {
                    expect(testUrl.url).toBeDefined();
                    expect(testUrl.url.length).not.toBe(0);
                // wrap your tests inside a function and imme
                //diatley invoke to avoid closure problems
                })(allFeeds[i]);
            }
        });
 

        /* Test: Loop through each feed
         * in the allFeeds object and ensure it has a name defined
         * and that the name is not empty.
         */
        it('all have a valid name', function(){
            for (var i =0; i< allFeeds.length; i++) {
                (function(testName) {
                    expect(testName.name).toBeDefined();
                    expect(testName.name.length).not.toBe(0);
                })(allFeeds[i]);
            }
        });
    });


    /* New test suite named "The menu" */
    describe('The menu', function(){
        var body, menu_Icon;
        body = $("body");
        menu_Icon = $(".menu-icon-link");

        /* Test: Make sure that the menu element is
         * hidden by default.
         */
        it('is hidden by default', function(){
            // Check wether body has that class which leads
            // to a hidden menu (moved to the left)
            expect(body.hasClass("menu-hidden")).toBe(true);
        });


        

         /* Make sure that the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('displays on click and hides on second click', function(){
            // simulate click event
            menu_Icon.trigger('click');
            // make sure menu is visible
            expect(body.hasClass("menu-hidden")).toBe(false);

            //Simulate second click event
            menu_Icon.trigger('click');
            // make sure menu is hidden again
            expect(body.hasClass("menu-hidden")).toBe(true);

        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            // invoke the async loadFeed Function
            loadFeed(0, function() {
                done();
            });
        });

        it('load succesfully', function(){
            // after callback returned expect at least 
            // one entry within feed container
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });




    /* Test suite named "New Feed Selection".
        ENsure that invoking the loadFeed function
        actually leads to a new feed being displayed.
*/

    describe('New Feed Selection', function() {
        var feed1;
         // invoke loadFeed and store the feed in outer scope
         beforeEach(function(done) {
            loadFeed(2, function() {
                feed1 = $('.feed').html();
                done();
            });
        });
        // call loadFeed again with different index = different feed.
        // expect the new feed not to equal the var feed1
        it('leads to different entries', function(done) {
            loadFeed(0, function() {
                expect($('.feed').html()).not.toEqual(feed1);
                done();
            });
            
        });
    });
}());
