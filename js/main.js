var money = 1000;
var waste = 0;
var selected = 0;
var rateMoney = 0;
var rateWaste = 0;
var year = 2014;
var blocks = [{"bType":"", "bVersion":""},
	{"bType":"", "bVersion":""},
	{"bType":"", "bVersion":""},
	{"bType":"", "bVersion":""},
	{"bType":"", "bVersion":""},
	{"bType":"", "bVersion":""}];
var firstBlock = false;
var smudFacts = ["SMUD's headquarters building, built in the late 1950s on the edge of the East Sacramento neighborhood, is notable for its mural by Wayne Thiebaud.",
	"SMUD is one of the ten largest publicly owned utilities in the United States, generating the bulk of its power through natural gas.",
	"SMUD houses large hydroelectric generation plants that account for 22% of its power.",
	"SMUD's green power (renewable) energy output was estimated as 19% in 2009."];

$(document).ready(function(){
	refreshMoney();
	$('.titlescreen').fadeIn();
	$('.year-number').text(year);
	$('.block').click(function(){
		if (blocks[$(this).data('block')].bType == "") {
			$('.buy-menu').fadeIn();
		} else {
			upgradeImgRefresh();
			$('.upgrade-menu').slideDown();
		}
		selected = $(this).data('block');
	});
	$('.escape-container').click(function(){
		$('.popup').fadeOut();
	});
	$('.btn-next').click(function()
		{
			$('.year-report').fadeOut();
		});
	$('.btn-start').click(function(){
		$('.popup').fadeOut();
	});
	$('.btn-buy').click(function(){
		addBuilding(selected, $(this).data('buy'), 1);
		refreshMoney();
		$('.popup').fadeOut();
	});
	$('.btn-upgrade').click(function(){
		upgrade(selected, blocks[selected].bType, $(this).data('upgrade'));
		refreshMoney();
		refreshVersion(selected);
		$('.popup').fadeOut();
	});
	$('.btn-remove').click(function () {
		var remove = blocks[selected];
		remove.bType = "";
		remove.bVersion = "";
		refresh(selected);
		$('.block[data-block=' + selected + '] .version-text').fadeOut();
		$('.popup').fadeOut();
	});
	$('.btn-next-year').click(function(){
		if (firstBlock) {
			nextYear();
		} else {
			alert("You need to purchase your first energy source.");
		}
	});
	$('.remove-waste-25-btn').click(function(){
		if(money >= 200)
		{
			money = money - 200;
			if(waste - 25 <= 0)
			{
				waste = 0;
			}
			else{
				waste = waste - 25;
			}
			refreshMoney();
			refreshWaste();
		}
		else{
			alert('You do not have enough money');
		}
		refreshMoney();
		refreshWaste();
	});
	$('.remove-waste-50-btn').click(function(){
		if(money >= 400)
		{
			money = money - 400;
			if(waste - 50 <= 0)
			{
				waste = 0;
			}
			else{
				waste = waste - 50;
			}
			refreshMoney();
			refreshWaste();
		}
		else{
			alert('You do not have enough money');
		}
		refreshMoney();
		refreshWaste();
	});
});

function addBuilding (blockId, buildingType, buildingVersion){
	switch(buildingType){
		case 'oil':
			if (firstBlock == false) {
				firstBlock = true;
			}
			if (money >= 100) {
				blocks[blockId].bType = "oil";
				blocks[blockId].bVersion = buildingVersion;
				money = money - 100;
				rateMoney = rateMoney + 100;
				rateWaste = rateWaste + 15;
				refresh(selected);
			} else {
				alert("Need mas money!");
			}
			break;
		case 'solar':
			if (money >= 500) {
				blocks[blockId].bType = "solar";
				blocks[blockId].bVersion = buildingVersion;
				money = money - 500;
				rateMoney = rateMoney + 250;
				rateWaste = rateWaste + 5;
				refresh(selected);
			} else {
				alert("Need mas money!");
			}
			break;
		case 'nuclear':
			if (money >= 2500) {
				blocks[blockId].bType = "nuclear";
				blocks[blockId].bVersion = buildingVersion;
				money = money - 2500;
				rateMoney = rateMoney + 1500;
				rateWaste = rateWaste + 15;
				refresh(selected);
			} else {
				alert("Need mas money!");
			}
			break;
		case 'wind':
			if (money >= 1500) {
				blocks[blockId].bType = "wind";
				blocks[blockId].bVersion = buildingVersion;
				money = money - 1500;
				rateMoney = rateMoney + 500;
				rateWaste = rateWaste + 5;
				refresh(selected);
			} else {
				alert("Need mas money!");
			}
			break;
		default:
			blocks[blockId].bType = null;
			blocks[blockId].bVersion = null;
			break;
	}
}

function upgrade(blockId, buildingType, buildingVersion) {
	switch(buildingVersion){
		case 1:
			if (blocks[blockId].bVersion == 1) {
				alert('This is already your version.');
			} else {

			}
			break;
		case 2:
			if (blocks[blockId].bVersion == 2) {
				alert('This is already your version.');
			} else {
				if (money >= 1000){
					blocks[blockId].bVersion = buildingVersion;
					money = money - 1000;
					rateMoney = rateMoney + 100 * 1.5;
					rateWaste = rateWaste + 5;
				} else {
					alert("Need mas money!");
				}
			}
			break;
		case 3:
			if (blocks[blockId].bVersion == 3000) {
				alert('This is already your version.');
			} else {
				if (money >= 3000){
					blocks[blockId].bVersion = buildingVersion;
					money = money - 3000;
					rateMoney = rateMoney + 100 * 2;
					rateWaste = rateWaste + 5;
				} else {
					alert("Need mas money!");
				}
			}
			break;
		case '':

			break;
		default:
			break;
	}
}

function upgradeImgRefresh() {
	var type = blocks[selected].bType;
	var imgUrl;
	switch(type){
		case 'oil':
			imgUrl = "img/oil.png";
			break;
		case 'solar':
			imgUrl = "img/solar.png";
			break;
		case 'nuclear':
			imgUrl = "img/nuclear.png";
			break;
		case 'wind':
			imgUrl = "img/wind.png";
			break;
		case '':
			imgUrl = "";
			break;
		default:
			imgUrl = null;
			break;
	}
	$('.upgrade-menu img').attr('src', imgUrl);
}

function refresh (blockId){
	var type = blocks[blockId].bType;
	var version = blocks[blockId].bVersion;
	var imgUrl;
	switch(type){
		case 'oil':
			imgUrl = "img/oil.png";
			break;
		case 'solar':
			imgUrl = "img/solar.png";
			break;
		case 'nuclear':
			imgUrl = "img/nuclear.png";
			break;
		case 'wind':
			imgUrl = "img/wind.png";
			break;
		case '':
			imgUrl = "";
			break;
		default:
			imgUrl = null;
			break;
	}
	$('.block[data-block=' + blockId + '] img').attr('src', imgUrl);
	$('.block[data-block=' + blockId + '] .version-text').text('Version ' + version);
	$('.block[data-block=' + blockId + '] .version-text').data('version', version);
	$('.block[data-block=' + blockId + '] .version-text').fadeIn();
}

function refreshVersion(blockId){
	var type = blocks[blockId].bType;
	var version = blocks[blockId].bVersion;
	$('.block[data-block=' + blockId + '] .version-text').text('Version ' + version);
	$('.block[data-block=' + blockId + '] .version-text').data('version', version);
}

function refreshMoney (){
	$('.money-amount').text('$' + money);
}

function refreshWaste (){
	var wasteBar = $('.waste-bar');
	wasteBar.text(waste + '%');
	wasteBar.css('width', waste + '%');
}

function nextYear(){
	$('.year-report').fadeIn();
	$('.year-gain').text(rateMoney);
	$('.year-waste').text(rateWaste + '%');
	money = money + rateMoney;
	waste = waste + rateWaste;
	$('.fact-text').text(smudFacts[Math.floor(Math.random()*smudFacts.length)]);
	$('.remove-waste-25').text('$200');
	$('.remove-waste-50').text('$400');
	if (waste >= "100"){
		gameOver();
		var wasteBar = $('.waste-bar');
		wasteBar.text('100%');
		wasteBar.css('width', '100%');
	} else {
		refreshMoney();
		refreshWaste();
		year++;
		$('.year-number').text(year);
	}	
}

function wipeGrid(){
	for (var i = blocks.length - 1; i >= 0; i--) {
		refresh(i);
	};
}

function gameOver(){
	$('.yearnum').text(year - 2014);
	$('.btn-next-year').fadeOut('fast');
	$('.gameover').fadeIn();
	$('.btn-again').click(function(){
		money = 1000;
		refreshMoney();
		waste = 0;
		refreshWaste();
		selected = 0;
		rateMoney = 0;
		rateWaste = 0;
		year = 2014;
		$('.year-number').text(year);
		blocks = [{"bType":"", "bVersion":""},
		{"bType":"", "bVersion":""},
		{"bType":"", "bVersion":""},
		{"bType":"", "bVersion":""},
		{"bType":"", "bVersion":""},
		{"bType":"", "bVersion":""}];
		wipeGrid();
		$('.gameover').fadeOut();
		$('.version-text').fadeOut();
		$('.btn-next-year').fadeIn();
		year = 0;
		firstBlock = false;
	});
	$('.btn-menu').click(function(){
			
	});

}

//Add next year if buildings exist done
//add title screen done
//fix image sizes done
//change year to year done

//add versions
//show benefits
//upgrade all same + percentage differences