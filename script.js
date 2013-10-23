#import "./Helper.js"
#import "./tuneup_js/test.js"

test("test Device",DeviceTest);

test("Account Test", SettingsTest);
test("Login Test", LoginTest);
test("Buddy List Test",BuddyListTest);
test("Chat Test",ChatLogTest);

function DeviceTest(target,app)
{
	target.delay(2);
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

function pressBackButton(target, app)
{
	var window = app.mainWindow();
    var navBar = window.navigationBar();
    var backButton = navBar.leftButton();
    backButton.tap();
    target.delay(1);
}

function SettingsTest(target, app)
{
    var window = app.mainWindow();
    var navBar = window.navigationBars()[0];
    var settingsButton = navBar.rightButton();
    settingsButton.tap();
    var tableView = app.mainWindow().tableViews()[0];
    tableView.cells()[1].tap();
    target.delay(1);


    captureLocalizedScreenshot("Accounts");
    target.delay(1);

    tableView = app.mainWindow().tableViews()[0];
    tableView.cells()[2].tap();
    target.delay(1);

    captureLocalizedScreenshot("XMPP_Settings");
    target.delay(1);


    pressBackButton(target,app);
    pressBackButton(target,app);

}

function LoginTest(target, app)
{
	var tableView = app.mainWindow().tableViews()[0];
    tableView.cells()[0].tap();
    target.delay(1);

    //captureLocalizedScreenshot("Login");


    var window = app.mainWindow();
    var navBar = window.navigationBars()[0];
    var settingsButton = navBar.rightButton();
    settingsButton.tap();

    target.delay(5);
    pressBackButton(target,app);
    
}

function BuddyListTest(target, app)
{
	target.delay(1);
	//pressBackButton(target,app);
    target.delay(1);

    captureLocalizedScreenshot("BuddyList");
}

function ChatLogTest(target,app)
{
	var tableView = app.mainWindow().tableViews()[0];
	tableView.cells()[0].tap();
	target.delay(3);
	captureLocalizedScreenshot("ChatLog");
	target.delay(1);
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



