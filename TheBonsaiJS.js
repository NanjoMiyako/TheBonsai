class Node{

	constructor(stX, stY, enX, enY, length1, angle1, bold1, LeafCount1){
		this.parent = null
		this.subBrunchList = [];
		this.subLeafList = [];
		this.startPt = [stX, stY];
		this.endPt = [enX, enY];
		this.angle = angle1;
		this.length1 = length1;
		this.bold = bold1;
		this.CrBold = 0;
		this.LeafCount = LeafCount1
		
	}
	
	addChild(childNode){
		this.subBrunchList.push(childNode);
		childNode.parent = this;
	}
}

class TreeAttribute{

	//木の色
	TreeColor;
	//葉の色
	TreeLeafColor;
	//葉の横幅
	TreeLeafWidth;
	//葉の高さ
	TreeLeafHight;
	
	//幹の太さ
	TreeStemBold;
	//幹の高さ
	TreeStemHight;
	//幹の一番下の位置
	TreeStemPos;
	
	
	//枝の分岐の回数
	TreeBrunchDeepLength;
	
	//発生する枝の個数の範囲
	TreeBrunchCountMax = 5;
	TreeBrunchCountMin = 3;
	
	//枝分かれする場所の長さの範囲
	TreeBrunchBrunchingPosMaxPercent
	TreeBrunchBrunchingPosMinPercent
	
	//枝の長さの範囲
	TreeBrunchLengthMaxPercent;
	TreeBrunchLengthMinPercent;
	
	//枝の太さの範囲
	TreeBrunchWidthMaxPercent;
	TreeBrunchWidthMinPercent;
	
	//上位80%の枝の角度の範囲
	TreeBrunchMainAngleMax;
	TreeBrunchMainAngleMin;
	
	TreeBrunchAngleMax;
	TreeBrunchAngleMin;
	
	TreeRootBrunchList;
	
	//葉の個数の範囲
	LeafCountMin;
	LeafCountMax;
	
	
}

MyTreeAttribute = new TreeAttribute();
function InitTreeAttribute(){

	MyTreeAttribute.TreeColor = [211, 211, 211]
	MyTreeAttribute.TreeLeafColor = [0,250,154]
	
	MyTreeAttribute.TreeLeafWidth = 10;
	MyTreeAttribute.TreeLeafHight = 10;
	
	
	MyTreeAttribute.TreeStemBold = 50;
	MyTreeAttribute.TreeStemHight = 250;
	MyTreeAttribute.TreeStemPos = [250, 500]
	
	MyTreeAttribute.TreeBrunchDeepLength = 2;
	
	MyTreeAttribute.TreeBrunchBrunchingPosMaxPercent = 100;
	MyTreeAttribute.TreeBrunchBrunchingPosMinPercent = 20;
	
	MyTreeAttribute.TreeBrunchLengthMaxPercent = 120;
	MyTreeAttribute.TreeBrunchLengthMinPercent = 50;
	
	MyTreeAttribute.TreeBrunchWidthMaxPercent = 100;
	MyTreeAttribute.TreeBrunchWidthMinPercent = 80;
	
	MyTreeAttribute.TreeBrunchMainAngleMax = 150;
	MyTreeAttribute.TreeBrunchMainAngleMin = 30;
	
	MyTreeAttribute.TreeBrunchAngleMax = 180;
	MyTreeAttribute.TreeBrunchAngleMin = 0;
	
	MyTreeAttribute.LeafCountMax = 8;
	MyTreeAttribute.LeafCountMin = 3;
	
	
	
	MyTreeAttribute.TreeRootBrunchList = [];

	
}


function MakeTreeGrowPlan(){

	//幹の一番上の座標
	TreeStemEndPos = [MyTreeAttribute.TreeStemPos[0], MyTreeAttribute.TreeStemPos[1]-MyTreeAttribute.TreeStemHight];

	Root1BrunchLength = Math.floor(MyTreeAttribute.TreeStemHight * 0.5);
	Root2BrunchLength = Math.floor(MyTreeAttribute.TreeStemHight * 0.5);
	
	Root1Angle = 30;
	Root2Angle = 150;
	
	Root1Bold = Math.max(Math.floor(MyTreeAttribute.TreeStemBold / 5), 1);
	Root2Bold = Math.max(Math.floor(MyTreeAttribute.TreeStemBold / 5), 1);
	
	
	TreeRoot1BrunchStPos = [Math.floor(TreeStemEndPos[0]), Math.floor(TreeStemEndPos[1]+(MyTreeAttribute.TreeStemHight*0.2))]
	TreeRoot1BrunchEndPos = [Math.floor(TreeRoot1BrunchStPos[0] + Root1BrunchLength * Math.cos(Root1Angle*Math.PI/180)), 
							 Math.floor(TreeRoot1BrunchStPos[1] - Root1BrunchLength * Math.sin(Root1Angle*Math.PI/180))]
	
	TreeRoot2BrunchStPos = [Math.floor(TreeStemEndPos[0]), Math.floor(TreeStemEndPos[1]+(MyTreeAttribute.TreeStemHight*0.2))]
	TreeRoot2BrunchEndPos = [Math.floor(TreeRoot2BrunchStPos[0] + Root2BrunchLength * Math.cos(Root2Angle*Math.PI/180)),
							 Math.floor(TreeRoot2BrunchStPos[1] - Root2BrunchLength * Math.sin(Root2Angle*Math.PI/180))]
							 
	TreeRoot1LeafCount = getRandom(MyTreeAttribute.LeafCountMin, MyTreeAttribute.LeafCountMax);
	TreeRoot2LeafCount = getRandom(MyTreeAttribute.LeafCountMin, MyTreeAttribute.LeafCountMax);
	
		
	//constructor(stX, stY, enX, enY, length1, angle1, bold1, LeafCount1)
	Root1 = new Node(TreeRoot1BrunchStPos[0], TreeRoot1BrunchStPos[1], TreeRoot1BrunchEndPos[0], TreeRoot1BrunchEndPos[1],
					 Root1BrunchLength, Root1Angle, Root1Bold, TreeRoot1LeafCount);
					 
	Root2 = new Node(TreeRoot2BrunchStPos[0], TreeRoot2BrunchStPos[1], TreeRoot2BrunchEndPos[0], TreeRoot2BrunchEndPos[1],
					 Root2BrunchLength, Root2Angle, Root2Bold, TreeRoot2LeafCount);
					 
					 
	MyTreeAttribute.TreeRootBrunchList.push(Root1);
	MyTreeAttribute.TreeRootBrunchList.push(Root2);
	
	AddChild2(Root1, 0, MyTreeAttribute.TreeBrunchDeepLength);
	AddChild2(Root2, 0, MyTreeAttribute.TreeBrunchDeepLength);
	
	return
}


function AddChild2(parent, deepCount, maxDeep){

	if(maxDeep < deepCount){
		return;
	}
	
	childCount = getRandom(MyTreeAttribute.TreeBrunchCountMin, MyTreeAttribute.TreeBrunchCountMax);
	
	for(var i=0; i<childCount; i++){
		r1_1 = getRandom(MyTreeAttribute.TreeBrunchBrunchingPosMinPercent, MyTreeAttribute.TreeBrunchBrunchingPosMaxPercent);
		r2_1 = 100 - r1_1;
		
		ptX = Math.floor((r2_1 * parent.startPt[0] + r1_1 * parent.endPt[0]) / 100);
		ptY = Math.floor((r2_1 * parent.startPt[1] + r1_1 * parent.endPt[1]) / 100);
		
		r1_2 = getRandom(MyTreeAttribute.TreeBrunchLengthMinPercent, MyTreeAttribute.TreeBrunchLengthMaxPercent);
		len1 = Math.max(Math.floor(parent.length1 * (r1_2/100)), 1);
		
		r1_3 = getRandom(1, 100);
		if(r1_3 <= 80){
			r2_3 = getRandom(MyTreeAttribute.TreeBrunchMainAngleMax, MyTreeAttribute.TreeBrunchMainAngleMin);
			angle1 = r2_3;
		}else{
			r2_3 = getRandom(MyTreeAttribute.TreeBrunchAngleMax, MyTreeAttribute.TreeBrunchAngleMin);
			angle1 = r2_3;
		}
		
		
		ptEnX = Math.floor( ptX + len1 * Math.cos(angle1*Math.PI/180) );
		ptEnY = Math.floor( ptY - len1 * Math.sin(angle1*Math.PI/180) );
		
		r1_4 = getRandom(MyTreeAttribute.TreeBrunchWidthMinPercent, MyTreeAttribute.TreeBrunchWidthMaxPercent);
		bold1 = Math.max( Math.floor(parent.bold * (r1_4/100)), 1);
		
		r1_5 = getRandom(MyTreeAttribute.LeafCountMin, MyTreeAttribute.LeafCountMax);
		LeafCount1 = r1_5
		
		//constructor(stX, stY, enX, enY, length1, angle1, bold1, LeafCount1)
		child1 = new Node(ptX, ptY, ptEnX, ptEnY, len1, angle1, bold1, LeafCount1);
		parent.addChild(child1);
		
		AddChild2(child1, deepCount+1, MyTreeAttribute.TreeBrunchDeepLength)
		
	}
	
	return

}



function getRandom( min, max ) {
    var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
  
    return random;
}

function DrowStem(){
	var cs = document.getElementById('canvas1');
	var ctx = cs.getContext('2d');
	var csWidth = cs.width;
	var csHight = cs.height;
	
	ctx.lineWidth = MyTreeAttribute.TreeStemBold;
	ctx.strokeStyle = 'rgb(' + MyTreeAttribute.TreeColor[0] + ', ' 
						     + MyTreeAttribute.TreeColor[1] + ', '
						     + MyTreeAttribute.TreeColor[2] + ')';
	
	ctx.beginPath();
	ctx.moveTo(MyTreeAttribute.TreeStemPos[0], MyTreeAttribute.TreeStemPos[1]);
	ctx.lineTo(MyTreeAttribute.TreeStemPos[0], csHight - MyTreeAttribute.TreeStemHight);
	ctx.closePath();
	ctx.stroke();
}

var testCount = 0;
function DrowBrunch(stX, stY, enX, enY, bold1){

	var cs = document.getElementById('canvas1');
	var ctx = cs.getContext('2d');
	var csWidth = cs.width;
	var csHight = cs.height;
	
	ctx.lineWidth = bold1;
	ctx.strokeStyle = 'rgb(' + MyTreeAttribute.TreeColor[0] + ', ' 
						     + MyTreeAttribute.TreeColor[1] + ', '
						     + MyTreeAttribute.TreeColor[2] + ')';
	
	ctx.beginPath();
	ctx.moveTo(stX, stY);
	ctx.lineTo(enX, enY);
	ctx.closePath();
	ctx.stroke();
	
	testCount = testCount + 1;

}


function Main(){

	InitTreeAttribute();
	MakeTreeGrowPlan();
	
	DrowStem();
	
	/*
	DrowBrunch(MyTreeAttribute.TreeRootBrunchList[0].startPt[0],
			   MyTreeAttribute.TreeRootBrunchList[0].startPt[1],
			   MyTreeAttribute.TreeRootBrunchList[0].endPt[0],
			   MyTreeAttribute.TreeRootBrunchList[0].endPt[1],
			   MyTreeAttribute.TreeRootBrunchList[0].bold);
	*/
	/*
	DrowTree(MyTreeAttribute.TreeRootBrunchList[0], MyTreeAttribute.TreeRootBrunchList[1]);
	alert('testCount:' + testCount);
	*/
	
	/*		   
	DrowBrunch(MyTreeAttribute.TreeRootBrunchList[1].startPt[0],
			   MyTreeAttribute.TreeRootBrunchList[1].startPt[1],
			   MyTreeAttribute.TreeRootBrunchList[1].endPt[0],
			   MyTreeAttribute.TreeRootBrunchList[1].endPt[1],
			   MyTreeAttribute.TreeRootBrunchList[1].bold);
	*/
	
	/*		   
	DrowBrunch(MyTreeAttribute.TreeRootBrunchList[0].subBrunchList[0].startPt[0],
			   MyTreeAttribute.TreeRootBrunchList[0].subBrunchList[0].startPt[1],
			   MyTreeAttribute.TreeRootBrunchList[0].subBrunchList[0].endPt[0],
			   MyTreeAttribute.TreeRootBrunchList[0].subBrunchList[0].endPt[1],
			   MyTreeAttribute.TreeRootBrunchList[0].subBrunchList[0].bold);
   	*/
   
   	//GrowTree3(MyTreeAttribute.TreeRootBrunchList[0], MyTreeAttribute.TreeRootBrunchList[1] );

}


var g_CountEnd = 60;
var g_Count = 0;
//何ミリ秒ごとに成長するか
var g_StepMillSec = 60 * 1000;


function startGrowing(){
	endHour =  Number(document.getElementById("GrowHourTextBox").value);
	g_CountEnd = 60 * endHour;
	
	GrowTree3(MyTreeAttribute.TreeRootBrunchList[0], MyTreeAttribute.TreeRootBrunchList[1]);
}

function GrowTree3(RootBr1, RootBr2){
	GrowTree2(RootBr1);
	GrowTree2(RootBr2);
	
	g_Count = g_Count + 1;
	if(g_Count > g_CountEnd){
		alert('成長終了しました');
	}else{
		setTimeout(GrowTree3, g_StepMillSec,  RootBr1, RootBr2);
	}
	
}

function AddLeaf(Node1){

		
        r1_1 = getRandom(1, 10);
        //50%の確率で葉を追加する        
        if((r1_1 % 2) == 0 && Node1.LeafCount > Node1.subLeafList.length){
			r1_2 = getRandom(MyTreeAttribute.TreeBrunchBrunchingPosMinPercent, MyTreeAttribute.TreeBrunchBrunchingPosMaxPercent);
			r2_2 = 100 - r1_2;
			
			ptX = Math.floor((r2_2 * Node1.startPt[0] + r1_2 * Node1.endPt[0]) / 100);
			ptY = Math.floor((r2_2 * Node1.startPt[1] + r1_2 * Node1.endPt[1]) / 100);
			
			r1_3 = getRandom(1, 10);
			if((r1_3 % 2) == 0){
				ptY = ptY - MyTreeAttribute.TreeLeafHight / 2;
			}else{
				ptY = ptY + MyTreeAttribute.TreeLeafHight / 2;
			}
			
			Node1.subLeafList.push([ptX, ptY]);
        	
        	
        }else{
        
        	return;
        
        }
        
        return;
	
}

function DrowLeaf(ptX, ptY){
	var cv = document.getElementById("canvas1");
	var ctx = cv.getContext("2d");


	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(' + MyTreeAttribute.TreeLeafColor[0] + ', ' 
						     + MyTreeAttribute.TreeLeafColor[1] + ', '
						     + MyTreeAttribute.TreeLeafColor[2] + ')';
						     
	ctx.fillStyle =  'rgb(' + MyTreeAttribute.TreeLeafColor[0] + ', ' 
						     + MyTreeAttribute.TreeLeafColor[1] + ', '
						     + MyTreeAttribute.TreeLeafColor[2] + ')';
						     
	ctx.beginPath();
	ctx.moveTo(ptX, ptY);
	ctx.lineTo(ptX+(MyTreeAttribute.TreeLeafWidth/2), ptY+(MyTreeAttribute.TreeLeafHight/2));
	ctx.lineTo(ptX+(MyTreeAttribute.TreeLeafWidth), ptY);
	ctx.lineTo(ptX+(MyTreeAttribute.TreeLeafWidth/2), ptY-(MyTreeAttribute.TreeLeafHight/2));
	ctx.closePath();  //moveTo()で指定した始点に向けて線を引き、領域を閉じます。
	ctx.fill();  //stroke()では輪郭線を描き、fill()にすると中を塗りつぶします。
	

}
function GrowTree2(Node1){
	
	if(Node1.CrBold < Node1.bold){
		Node1.CrBold = Node1.CrBold + 1
	}
	DrowBrunch(Node1.startPt[0], Node1.startPt[1], Node1.endPt[0], Node1.endPt[1], Node1.CrBold);
	AddLeaf(Node1);
	for(var j=0; j<Node1.subLeafList.length; j++){
		leaf1 = Node1.subLeafList[j];
		DrowLeaf(leaf1[0], leaf1[1]);
	}
	
	for(var i=0; i<Node1.subBrunchList.length; i++){
		node2 = Node1.subBrunchList[i];
		if(node2.bold <= Node1.CrBold){
			GrowTree2(node2);
		}
	}
	
	
}

function DrowBrunch2(Node1){

	DrowBrunch(Node1.startPt[0], Node1.startPt[1], Node1.endPt[0], Node1.endPt[1], Node1.bold);
	
	for(var i=0; i<Node1.subBrunchList.length; i++){
		node2 = Node1.subBrunchList[i];
		DrowBrunch2(node2);
	}
}

function DrowTree(RootBr1, RootBr2){

	DrowBrunch2(RootBr1);
	DrowBrunch2(RootBr2);
}


Main();









