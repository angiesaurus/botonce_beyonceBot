/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=xoxb-38312091044-CGmWVKlB6BdMcjziXASW6t6o node slack_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var request = require("request");

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


var quotes = ["Your self-worth is determined by you. You don’t have to depend on someone telling you who you are.",
"I don’t like to gamble, but if there’s one thing I’m willing to bet on, it’s myself.",
"Call becky with the good hair.",
"I only allow myself one day to feel sorry for myself. People who complain really get on my nerves. When I’m not feeling my best I ask myself, ‘What are you gonna do about it?’ I use the negativity to fuel the transformation into a better me.",
"Take all the rules away. How can we live if we don’t change?",
"She too smart to crave material things. She pushing herself day and night. She grinds from Monday to Friday. Works from Friday to Sunday. Oh, stars in her eyes",
"I got a hot sauce in my bag, swag",
"We all have our imperfections. But I'm human, and you know, it's important to concentrate on other qualities besides outer beauty.",
"I see it, I want it, I stunt, yellow-bone it. I dream it, I work hard, I grind 'til I own it. I twirl on them haters, albino alligators",
"Okay, ladies, now let's get in formation, cause I slay",
"Stop making a big deal out of the little things",
"Of course sometimes shit go down when it's a billion dollars on an elevator",
"If you’ve been doing all you can and it’s not happening for you, go out and have you a good old time. Put on your sexy dress and move on.",
"I woke up like this, I woke up like this",
"I felt like it was time to set up my future, so I set a goal. My goal was independence.",
"You and me could move a mountain.",
"Every promise don't work out that way.",
"When I’m not feeling my best I ask myself, ‘What are you gonna do about it?’ I use the negativity to fuel the transformation into a better me.",
"I'm a keep running because a winner don't quit on themselves.",
"Ashes to ashes, dust to side chicks.",
"My biggest thing is to teach not to focus on the aesthetic. It’s really about who you are, and the human being, that makes you beautiful.",
"I don’t have to prove anything to anyone, I only have to follow my heart and concentrate on what I want to say to the world. I run my world.",
"Do what you were born to do. You just have to trust yourself.",
"The reality is: sometimes you lose. And you’re never too good to lose. You’re never too big to lose. You’re never too smart to lose. It happens.",
"I’m a workaholic and I don’t believe in ‘No’. If I’m not sleeping, nobody’s sleeping.",
"Your self-worth is determined by you. You don’t have to depend on someone telling you who you are.",
"I like to walk around with bare feet and I don't like to comb my hair.",
"We got the swag sauce, she dripping swagu",
"There are a lot of things I never did, because I believe in watching those true Hollywood stories and I see how easy it is to lose track of your life.",
"I just try to write songs that people are going to have a dialogue about.",
"I am really proud that I am one of the artists that has the opportunity to be on magazine covers and to be in the movies.",
"When you love and accept yourself, when you know who really cares about you, and when you learn from your mistakes, then you stop caring about what people who don't know you think.",
"If everything was perfect, you would never learn and you would never grow.",
"I can never be safe; I always try and go against the grain. As soon as I accomplish one thing, I just set a higher goal. That's how I've gotten to where I am.",
];

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'botonce',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});

// // reply to any incoming message
// controller.on('message_received', function(bot, message) {
//     bot.reply(message, 'I heard... something!');
// });

controller.hears(['who slay'], 'direct_message,direct_mention,mention', function(bot, message) {
    request("http://api.giphy.com/v1/gifs/search?q=beyonce&api_key=dc6zaTOxFJmzC", function (error, response, body){
      var data = JSON.parse(body);

      var max = data.data.length;
      var min = 0;

      var randomNumber = Math.floor(Math.random() * (max - min)) + min;

      gifUrl = data.data[randomNumber].images.downsized.url;

      replyMessage = "You slay!\n" + gifUrl;

      controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, replyMessage + user.name + '!!');
        } else {
            bot.reply(message, replyMessage);
        }
    });
    });
});

controller.hears(['motivate me'], 'direct_message,direct_mention,mention', function(bot, message) {
    request("http://api.giphy.com/v1/gifs/search?q=beyonce&api_key=dc6zaTOxFJmzC", function (error, response, body){
      var data = JSON.parse(body);

      var max = data.data.length;
      var min = 0;

      var randomNumber = Math.floor(Math.random() * (max - min)) + min;

      gifUrl = data.data[randomNumber].images.downsized.url;

      replyMessage = quotes[Math.floor(Math.random()*quotes.length)] + gifUrl;

      bot.reply(message, replyMessage);
    });
});

controller.hears(['who run the world'], 'direct_message,direct_mention,mention', function(bot, message) {
    request("http://api.giphy.com/v1/gifs/search?q=beyonce&api_key=dc6zaTOxFJmzC", function (error, response, body){
      var data = JSON.parse(body);

      var max = data.data.length;
      var min = 0;

      var randomNumber = Math.floor(Math.random() * (max - min)) + min;

      gifUrl = data.data[randomNumber].images.downsized.url;

      replyMessage = "Girls!\n" + gifUrl;

      bot.reply(message, replyMessage);
    });
});

controller.hears(['beyonce gif me'], 'direct_message,direct_mention,mention', function(bot, message) {
    request("http://api.giphy.com/v1/gifs/search?q=beyonce&api_key=dc6zaTOxFJmzC", function (error, response, body){
      var data = JSON.parse(body);

      var max = data.data.length;
      var min = 0;

      var randomNumber = Math.floor(Math.random() * (max - min)) + min;

      gifUrl = data.data[randomNumber].images.downsized.url;

      replyMessage = "Enjoy!" + gifUrl;

      bot.reply(message, replyMessage);
    });
});

controller.hears(['i love you'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        bot.reply(message, 'I know.');
    });
});

controller.hears(['call me (.*)', 'my name is (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. You shall be known to me as ' + user.name + ' from now on.');
        });
    });
});

controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});


controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            '::botonce: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '. Angie is my owner.');

    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
