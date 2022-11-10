// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const axios = require('axios');
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    //use for random an answer before answering 
    function randomizer(x) {
        x = x + 1;
        var rand = Math.floor(Math.random() * x);
        return rand;
    }

    function updateSheet(z) {
        axios.get('https://sheetdb.io/api/v1/18lnlp3fu7168', {
    })
        .then((res) => {
            console.log("this is paremeter z's value : " + z);
            console.log(res.data[z]);
            let freq = res.data[z].frequency;
            console.log("after get " + freq);
            let freqInt = parseInt(freq);
            let x = freqInt + 1;
            let y = z + 1;
            let url ='https://sheetdb.io/api/v1/18lnlp3fu7168/id/' + y;
            console.log(url);
            axios.patch(url , {
                "data": { "frequency": x }
    
            }).then(response => {
                console.log(response.data);
                console.log("this is after pacth" + x);
            });
    
        });
    }
  
  	function howMany(agent) {

        if (randomizer(2) == 2) {
            agent.add(`ดูข้อมูลเพิ่มเติมได้ที่นี้ครับ https://lib.kku.ac.th/article.php?a_id=4414`);
        } else {
            agent.add(`50 รายการครับ`);
        }
        updateSheet(0);
    }
  	
  	function lateFine(agent) {
      if (randomizer(2) == 2) {
            agent.add(`หนังสือ 5 บาท/วัน/รายการ 
					ทรัพยากรที่ใช้อิเล็กทรอนิสก์ 50 บาท/วัน/รายการ
					ทรัพยากรที่ไม่ใช้อิเล็กทรอนิกส์ 20 บาท/วัน/รายการ`);
        } else {
            agent.add(`ดูข้อมูลเพิ่มเติมได้ที่นี่ครับ https://lib.kku.ac.th/article.php?a_id=4414`);
        }
        updateSheet(1);
    }
  
  	function howToBorrow(agent) {

        if (randomizer(2) == 2) {
            agent.add(`ติดต่อขอยืมที่ Counter ยืมคืน ชั้น 2 อาคารศูนย์สารสนเทศ โดยใช้บัตรสมาชิกของตนเองนะครับ ^^`);
        } else {
            agent.add(`ดูข้อมูลเพิ่มเติมได้ที่นี่ครับ https://lib.kku.ac.th/article.php?a_id=4414`);
        }
        updateSheet(2);
    }
  	
  	function howToRenew(agent) {
        if (randomizer(2) == 2) {
            agent.add(`นำบัตรสมาชิกมาติดต่อ Counter ยืมคืน ชั้น 2 อาคารศูนย์สารสนเทศ หรือยืมต่อด้วยตนเองที่เว็บ http://opac.kku.ac.th/Member/Login.aspx ครับ`);
        } else {
            agent.add(`1. ไปที่ URL: http://opac.kku.ac.th/Member/Login.aspx
				2. คลิกปุ่ม KKU Single Sign On (SSO) เพื่อเข้าสู่ระบบสมาชิก (สำหรับบุคลากรและนักศึกษา มข.)  
				3. คลิกเข้าสู่ระบบสมาชิกเพื่อทำการตรวจสอบรายการยืม ตรวจสอบค่าปรับ และยืมต่อ`);
        }	
        updateSheet(3);
    }
  
  	
  	
  	function renewQuota(agent) {
        agent.add(`ไม่จำกัดจำนวนครั้ง ยกเว้นมีคนจองหนังสือนั้นแล้วครับผม`);
        updateSheet(4);
    }
  
  	function nonKkuBorrow(agent) {

        if (randomizer(2) == 2) {
            agent.add(`สามารถยืมได้ครับ แต่ต้องสมัครเป็นสมาชิกก่อนน๊าา`);
        } else {
            agent.add(`ดูข้อมูลเพิ่มเติมได้ที่ https://lib.kku.ac.th/article.php?a_id=4209 ครับ`);
        }
        updateSheet(5);
    }
  	
  	
    function nonKkuUsage(agent) {

        if (randomizer(2) == 2) {
            agent.add(`บุคคลทั่วไป (สมาชิกสมทบชั่วคราว) ใช้บริการวันละ 20 บาท ใช้บัตรประชาชนแสดงหลักฐานในการเข้าใช้บริการ`);
        } else {
            agent.add(`ดูข้อมููลเพิ่มเติมได้ที่ https://lib.kku.ac.th/article.php?a_id=4209 ครับ`);
        }
        updateSheet(6);
    }
  	
	 function returnLocation(agent) {
        agent.add(`ผู้ใช้บริการสามารถหย่อนหนังสือที่ตู้ Book Drop หรือ คืนที่จุดบริการ ยืม คืน ชั้น 2 อาคารศูนย์สารสนเทศ ( กำหนดการเปิดตู้ Book Drop ทุกจุด วันจันทร์, พุธ และ ศุกร์ ช่วงเวลา 9.00 -10.30 น.)`);
        updateSheet(7);
    
    }   

    

    function olBooking(agent) {
        if (randomizer(2) == 2) {
            agent.add(`จองได้ผ่านเว็บ https://room.kku.ac.th/ ครับ`);
        } else {
            agent.add(`ดูข้อมูลเพิ่มเติมได้ที่  https://lib.kku.ac.th/article.php?a_id=4400`);
        }
        updateSheet(8);
    }

    function bookLocation(agent) {
        if (randomizer(2) == 2) {
            agent.add(`ค้นหาผ่านเว็บ https://opac.kku.ac.th/main/index.aspx`);
        } else {
            agent.add(`ดูคลิปแนะนำวิธีการสืบค้นที่ https://youtu.be/7i7IvAPyrr8`);
        }
        updateSheet(9);
    }
  
  	function whereIsMakerSpace(agent) {
        if (randomizer(2) == 2) {
            agent.add(`อยู่บริเวณ ชั้น 1 อาคาร 2 ครับ`);
        } else {
            agent.add(`สามารถ Inbox มาถามได้ที่ https://www.facebook.com/KKUMakerspace คร้าบ`);
        }
        updateSheet(10);
    }
	
  	function citationBookLocation(agent) {
        agent.add(`หนังสืออ้างอิงที่เป็นพจนานุกรม และหมวด A-P อยู่ ชั้น 3 ห้อง 2301 ครับ 
		ส่วนหมวด Q-Z ภาษาไทย-อังกฤษ อยู่ชั้น 6 ห้อง 2602`);
        updateSheet(11);
    }
    
   

    // // Uncomment and edit to make your own intent handler
    // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function yourFunctionHandler(agent) {
    //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    //   agent.add(new Card({
    //       title: `Title: this is a card title`,
    //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //       buttonText: 'This is a button',
    //       buttonUrl: 'https://assistant.google.com/'
    //     })
    //   );
    //   agent.add(new Suggestion(`Quick Reply`));
    //   agent.add(new Suggestion(`Suggestion`));
    //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    // }

    // // Uncomment and edit to make your own Google Assistant intent handler
    // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function googleAssistantHandler(agent) {
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
    //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    //   agent.add(conv); // Add Actions on Google library responses to your agent's response
    // }
    // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
    // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('bachelor book quota', howMany);
    intentMap.set('late fine', lateFine);
  	intentMap.set('how to borrow or return the book', howToBorrow);
    intentMap.set('how to renew', howToRenew);
  	intentMap.set('renew quota', renewQuota);
  	intentMap.set('non kku borrowing', nonKkuBorrow);
  	intentMap.set('non kku library usage', nonKkuUsage);
  	intentMap.set('return location', returnLocation);
  	intentMap.set('online booking', olBooking);
    intentMap.set('where to find the book', bookLocation);
  	intentMap.set('where is maker space', whereIsMakerSpace);
  	intentMap.set('citation book location', citationBookLocation);
    
    
    
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
});
