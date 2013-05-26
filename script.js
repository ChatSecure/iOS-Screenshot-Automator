#import "./Helper.js"
#import "./tuneup_js/test.js"

test("test Device",DeviceTest)

test("Settings Test", SettingsTest);
test("Login Test", LoginTest);
test("Buddy List Test",BuddyListTest);
test("Chat Test",ChatTest);

function DeviceTest(target,app)
{
	var model = target.model();

	if (model.match(/iPhone/))
	{
		target.setDeviceOrientation(UIA_DEVICE_ORIENTATION_PORTRAIT);
	}
	else
	{
		target.setDeviceOrientation(UIA_DEVICE_ORIENTATION_LANDSCAPELEFT);
	}
	
}

function SettingsTest(target, app)
{
    var window = app.mainWindow();
    var navBar = window.navigationBars()[0];
    var settingsButton = navBar.rightButton();
    settingsButton.tap();
    target.delay(1);


    captureLocalizedScreenshot("Settings");

    

}

function LoginTest(target, app)
{
	var tableView = app.mainWindow().tableViews()[0];
    tableView.cells()[0].tap()
    target.delay(1)

    captureLocalizedScreenshot("Login");


    var window = app.mainWindow();
    var navBar = window.navigationBar();
    var settingsButton = navBar.rightButton();
    settingsButton.tap();

    target.delay(5);
    
}

function BuddyListTest(target, app)
{
	var window = app.mainWindow();
    var navBar = window.navigationBar();
    var settingsButton = navBar.leftButton();
    settingsButton.tap();

    target.delay(1);

    captureLocalizedScreenshot("BuddyList");
}

function ChatTest(target, app)
{
	var tableView = app.mainWindow().tableViews()[0];
	tableView.cells().firstWithName("Martin Hellman").tap();
	

	var window = app.mainWindow();
    var navBar = window.navigationBars()[1];
    var lockButton = navBar.elements().firstWithName("lock");
    lockButton.tap();

    var actionsheet;
    var model = target.model();
		
	if (model.match(/iPhone/))
	{
		var actionsheet = app.actionsheet();
	}
	else
	{
		var actionsheet = app.mainWindow().popover().elements()["secure"]
	}

    actionsheet.buttons()[0].tap();

    var lockButton = navBar.elements().firstWithName("lock");
    lockButton.tap();

		
	if (model.match(/iPhone/))
	{
		var actionsheet = app.actionsheet();
	}
	else
	{
		var actionsheet = app.mainWindow().popover().elements()["secure"]
	}

	actionSheet.buttons()[1].tap();

    target.onAlert = function onAlert(alert) {
    	//UIALogger.logMessage("alertShown");
    	target.delay(1);
    	return true;
	}
	
    captureLocalizedScreenshot("Chat");   
}



