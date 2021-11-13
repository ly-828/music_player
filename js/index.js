$(function()
{
    var xmlhttp;//request
    //xmlhttp.open("GET")
    var playerContent1 = $('#player-content1');// 歌曲信息模块部分dom元素
    var musicName = $('.music-name');          // 歌曲名部分dom元素 
    var artistName = $('.artist-name');        // 歌手名部分dom元素
    
    var musicImgs = $('.music-imgs');          // 左侧封面图dom元素
  
    var playPauseBtn = $('.play-pause');       // 播放/暂停按钮 dom元素
    var playPrevBtn = $('.prev');              // 上一首按钮 dom元素
    var playNextBtn = $('.next')               // 下一首按钮 dom元素
    
    var time = $('.time');                     // 时间信息部分 dom元素
    var tProgress = $('.current-time');        // 当前播放时间文本部分 dom元素
    var totalTime = $('.total-time');          // 歌曲总时长文本部分 dom元素
    
    var sArea = $('#s-area');                  // 进度条部分
    var insTime = $('#ins-time');              // 鼠标移动至进度条上面，显示的信息部分
    var sHover = $('#s-hover');                // 鼠标移动至进度条上面，前面变暗的进度条部分
    var seekBar = $('#seek-bar');              // 播放进度条部分
    var i=0;
    // 一些计算所需的变量
    var seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0
       // 图片地址数组
              // 创作歌手数组
    var musicUrls0=["99 God - FLIGHT MODE",
    "AWOLNATION - Jailbreak",
    "Adam Lambert - Closer To You",
    "AloviL - 猫又",
    "Andy Tubman - Quiet Inside",
    "Anthony Hamilton,Elayna Boynton - Freedom",
    "Anti-General - Billie Eilish-bury a friend (Anti-General Redark)",
    "Ayu吴浩宇,侃迪kandi - 山顶见",
    "Bazzi - Myself",
    "Beth Hart - Am I The One (LP Version)",
    "BigYao - 归土",
    "Biz,HUNTRR - Church (Original Mix)",
    "Black Lab - This Night",
    "Bleachers - Goodmorning",
    "Brian Culbertson,Marcus Miller,Steve Cole - Midnight (feat. Marcus Miller & Steve Cole)",
    "Cannons - Baby",
    "Chantal Chamberland - Besame mucho",
    "Chapterhouse - Pearl",
    "Chromeo - Over Your Shoulder",
    "DENCHO - Tired",
    "Dayglow - Run the World!!!",
    "Deluxe - Tall Ground",
    "EighteenM木十八,孙韬智,YQbeef - 南昌大学2020CYPHER",
    "Eternity forever - Fantasy",
    "Foreign Air - Free Animal",
    "From Your Balcony - Loneliness",
    "Galimatias - South",
    "General Elektriks - Rebel Sun",
    "Gorillaz,Kali Uchis - She's My Collar",
    "Jackie Greene - I Don’t Live In A Dream",
    "Joan Jett & the Blackhearts - I Hate Myself for Loving You",
    "Joey Pecoraro - Finding Parking",
    "Joy Division - Isolation [2007 Re-mastered Album Version]",
    "Keb' Mo' - The Itch",
    "Kristin Chenoweth,Idina Menzel - Defying Gravity (From ＂Wicked＂ Original Broadway Cast Recording／2003)",
    "LAKEY INSPIRED - Blossom",
    "LAKEY INSPIRED - Elevate",
    "Led Zeppelin - Immigrant Song (2007 Remastered Version)",
    "Lexi Lawson,Ari Afsar,Rachelle Ann Go - First Burn",
    "Lorde - Liability",
    "Machine Gun Kelly,Kid Rock - Bad Mother F＊cker",
    "Madi Marie - grief",
    "Mando Diao - Shake",
    "Marilyn Manson - Sweet Dreams (Are made of This)",
    "Muse - Time Is Running Out",
    "Nicola Piovani - U-Turn (Lili)",
    "Nine Inch Nails - Head Like A Hole",
    "Noel Gallagher - Married With Children",
    "OneRepublic - Everybody Loves Me",
    "Otros Aires - Otra Noche En La Viruta",
    "PO - [付费]Greed-贪婪 日本和风Trap Beat",
    "Polyphia - Bittersweet",
    "Post Malone,Swae Lee - Sunflower (Spider-Man： Into the Spider-Verse)",
    "Radiohead - 15 Step",
    "Radiohead - All I Need",
    "Radiohead - Jigsaw Falling Into Place",
    "Rag'N'Bone Man - Disfigured",
    "Ruck P - Destination",
    "SIX GOD - 魔笛",
    "Shanghai Phantom,A.D.C - Du Yueh-Sheng",
    "Slumberjack - RA",
    "Smash Mouth - Walkin' On The Sun",
    "Sonic Youth - Kool Thing",
    "Sonic Youth - Stones",
    "Sonic Youth - Sunday",
    "Stereophonics - Drowning",
    "Stereophonics - I Stopped To Fill My Car Up",
    "T-K - 青行灯",
    "Tamino - Indigo Night",
    "The Jesus and Mary Chain - Rocket",
    "The Weeknd - Twenty Eight",
    "Thom Yorke - Black Swan",
    "Thom Yorke - Not the News",
    "Thom Yorke - The Eraser",
    "Thom Yorke - Twist",
    "Tommee Profitt,Fleurie - Sound Of War",
    "Travis - Love Will Come Through",
    "TroyBoi - Grimey",
    "Two Feet - Felt like playing guitar and not singing part 2",
    "Two Steps From Hell - Star Sky (Instrumental)",
    "Vin Jay - Out My Way",
    "Yeegoo - 菊与刀",
    "Young Fathers - Sirens",
    "上原ひろみ - Kung-Fu World Champion",
    "于贞 - 粒子们",
    "大悲 - 不由",
    "宠物同谋 - Flowers",
    "宠物同谋 - Nothing to do",
    "幼稚园杀手 - 反弹琵琶",
    "朴树 - 妈妈，我",
    "柴田淳 - 東京",
    "海朋森 - 我进入了绝望的时期",
    "海朋森 - 春风",
    "理想后花园 - 我的身旁是一扇亮了又暗的窗",
    "神山羊 - YELLOW",
    "福禄寿FloruitShow - 没咯",
    "阿爆 - mainu sun 找路"];// 歌曲mp3数组
    var musicNameData0 = musicUrls0;                   // 歌曲名数组
    var artistNameData0 = musicUrls0 ; 
    var musicImgsData0 = musicUrls0; 
    
     var musicUrls1=["A Toys Orchestra - Panic attack #3",
     "Aaron Tveit,Kerry Butler - Seven Wonders",
     "Adam Lambert - Feeling Good (American Idol Studio Version)",
     "Adam Lambert - Runnin'",
     "Adam Lambert - There I Said It",
     "Adele - Lovesong",
     "Aerosmith - Dream On",
     "Amason - California Dreamin'",
     "Amos Milburn - Let Me Go Home, Whiskey",
     "Andrea Bocelli - Bésame Mucho",
     "Andrea Bocelli - Melodramma",
     "Belarus - In The End Its Easy",
     "Ben Platt - Waving Through A Window",
     "Ben Platt,Kristolyn Lloyd,Will Roland - You Will Be Found",
     "Ben Platt,Lin-Manuel Miranda - Found／Tonight",
     "Beth Hart and Joe Bonamassa - I'll Take Care Of You",
     "Billie Eilish - Fingers Crossed",
     "Billie Eilish,Khalid - lovely",
     "Black Box Recorder - Rock 'n' Roll Suicide",
     "Blake Rose - Lost",
     "Bob Seger - Old Time Rock & Roll",
     "Brandi Carlile - Creep (Live at the Avalon, Boston, MA - May 2007)",
     "Buddy Holly - Everyday",
     "Caro Emerald - Paris",
     "Casey Abrams,Haley Reinhart - Hit The Road Jack",
     "Chase Holfelder - Animal",
     "Chris James - The Green",
     "Chuck Berry - Big Boys",
     "Coldplay - Yellow",
     "Concha Buika - Las Simples Cosas",
     "Cosmo Sheldrake - The Moss",
     "Cosmo Sheldrake,Andrea Vargas - Orby",
     "DIIV - Doused",
     "DOROTHY - Missile",
     "Dave Not Dave - Cold Blood",
     "Depeche Mode - Lilian",
     "Depeche Mode - The Dead Of Night",
     "Down to the Bone - Supercharged",
     "Ed Sheeran - All of the Stars",
     "Ed Sheeran - Make It Rain",
     "Editors - No Sound But the Wind",
     "Elle King - Ex's & Oh's",
     "Eric Clapton - Old Love (Live)",
     "Ernesto Romeo,Andrés Linetzky - Sentimentos",
     "Evan Rachel Wood - All Is Found (From ＂Frozen 2＂／Soundtrack Version)",
     "FINNEAS - Let's Fall in Love for the Night",
     "Fleurie - Breathe",
     "Fleurie - Hurts Like Hell",
     "Floating Points - Falaise",
     "Frank Wildhorn - Take Me As I Am",
     "From Your Balcony - That inferior feeling",
     "GOX0 - 骨の女",
     "Gary Moore - I Had A Dream",
     "Gerald Veasley - Traveling Light",
     "Gin Wigmore - Black Sheep",
     "Glen Hansard,Markéta Irglová - If You Want Me",
     "Green Day,U2 - The Saints Are Coming",
     "Hawk Nelson - Sold Out",
     "Henrik Freischlader - The Memory of Our Love",
     "Herbie Hancock - Watermelon Man",
     "Hozier - Take Me To Church",
     "Hugh Grant,Drew Barrymore - Way Back Into Love (Demo)",
     "Idina Menzel,Evan Rachel Wood - Show Yourself (From ＂Frozen 2＂／Soundtrack Version)",
     "Imagine Dragons - Dream",
     "Imagine Dragons - I’m So Sorry",
     "Isaac Gracie - Darkness Of The Day",
     "Isaac Gracie - Silhouettes Of You",
     "Isaac Gracie - terrified",
     "Isaac Gracie - that was then",
     "James Bay - Bad",
     "Jason Mraz - Bella Luna",
     "Jason Mraz - Life Is Wonderful (Live in Amsterdam)",
     "Jason Mraz - Living In The Moment",
     "Jason Mraz - Mr. Curiosity",
     "Jason Mraz - Plane",
     "Jeremy Jordan - Moving Too Fast",
     "Joe Robinson - Lethal Injection",
     "John Grant - Grey Tickles, Black Pressure",
     "John Legend - Who Did That to You？",
     "John Scofield,John Mayer - I Don't Need No Doctor",
     "Jose De Castro - Fiesta Funk",
     "June Noa - If I Ever Leave You",
     "Justin Timberlake,Carey Mulligan,Stark Sands - Five Hundred Miles",
     "KALEO - Hot Blood",
     "KALEO - I Can't Go On Without You",
     "KALEO - Way Down We Go (Stripped)",
     "Kate Rusby - I Am Stretched On Your Grave",
     "Lady Gaga - I'll Never Love Again (Extended Version - Radio Edit)",
     "Lady Gaga,Bradley Cooper - I'll Never Love Again (Film Version)",
     "Led Zeppelin - Stairway to Heaven (Remaster)",
     "Les Claypool - The Awakening",
     "Lewis Capaldi - Forever",
     "Lewis Capaldi - Someone You Loved",
     "LiSA - unlasting",
     "Lily Marks,Devin Lytle,Joey Richter - Goin' Back to Hogwarts",
     "Lin-Manuel Miranda,Renée Elise Goldsberry,Phillipa Soo - It's Quiet Uptown",
     "Linkin Park - Crawling (One More Light Live)",
     "Makeup and Vanity Set - The Prophet",
     "Mandarin - 摇篮曲 Cradle Song",
     "Mandarin - 茧",
     "Mando Diao - Brother",
     "Mando Diao - Dance With Somebody (Live)",
     "Mando Diao - Losing My Mind (Live)",
     "Mando Diao - Sheepdog (Live)",
     "Matthew Morrison,Aidan Gemme - When Your Feet Don’t Touch The Ground (Original Broadway Cast Recording)",
     "Matthew Perryman Jones - Living in the Shadows",
     "Michael Bublé - Dream a Little Dream of Me",
     "Michael Bublé - Kissing A Fool",
     "Michael Bublé - You Belong To Me",
     "Mighty Mo Rodgers - Continental Blues",
     "Miles Davis - So What",
     "Morphine - French Fries With Pepper",
     "Mr. Big - To Be With You",
     "Muse - Exogenesis： Symphony Part 3 (Redemption)",
     "Muse - Sing for Absolution",
     "Muse - Supremacy",
     "Muse - The 2nd Law： Isolated System",
     "Muse - The Dark Side",
     "Muse - The Void",
     "Muse - Unintended",
     "MØ - New Year's Eve",
     "NeoHuman - Uncaged Mind",
     "Nirvana - Lithium",
     "No Spirit - Slightly Improvised",
     "Oasis - Don't Look Back in Anger",
     "OneRepublic - Made for You",
     "Parker Millsap - Heaven Sent",
     "Paul McCartney,Eric Clapton - While My Guitar Gently Weeps",
     "Pilot Speed - Alright",
     "Pink Floyd - Eclipse",
     "Pink Floyd - Mother",
     "Polyphia - Nightmare",
     "Radiohead - Bodysnatchers",
     "Radiohead - Creep",
     "Radiohead - Exit Music (For a Film)",
     "Radiohead - Last Flowers",
     "Radiohead - Sail To the Moon",
     "Ray Charles,Elton John - Sorry Seems to Be the Hardest Word",
     "Richard Lewis - Where the Willows Grow",
     "Ruben Wan - Pure Imagination",
     "Ruck P - Soul Food",
     "Russell Crowe - Stars",
     "Ryan Gosling - City of Stars",
     "Sam Tinnesz - Play with Fire (feat. Yacht Money)",
     "Sara Bareilles - She Used To Be Mine",
     "Seal - Stand By Me [Live]",
     "Secession Studios - The Untold",
     "Sex Pistols - Rock Around the Clock",
     "Silya & The Sailors - Become My Dream",
     "Sonic Youth - 'Cross the Breeze",
     "Sonic Youth - Anti-Orgasm",
     "Stereophonics - Indian Summer",
     "Stereophonics - Nothing Precious At All",
     "Stereophonics - Since I Told You It's Over",
     "Stereophonics - Sunny",
     "Suede - Life is Golden",
     "Suede - The Power",
     "The Czars - Roger's Song",
     "The KVB - Across the Sea",
     "The Killers - Sam's Town (Acoustic) (Live From The Royal Albert Hall ／ 2009)",
     "The Kinks - Alcohol",
     "The Rolling Stones - Paint It, Black",
     "The Shanghai Restoration Project,张乐 - Paris of the East (feat. Zhou Yi)",
     "The Stone Roses - Made Of Stone",
     "The Weeknd - Blinding Lights",
     "Thom Yorke - Guess Again!",
     "Thom Yorke - Suspirium",
     "Tim Kamrad - Changes",
     "Tinsley Ellis - Kiss Of Death",
     "Tinsley Ellis - To the Devil for a Dime",
     "Tony O'Malley - Autumn Leaves",
     "Travis - New Shoes",
     "Travis - Quicksand",
     "Travis - Valentine",
     "Vansire - Halcyon Age",
     "Vansire - KW",
     "Yanni - Nei Tuoi Occhi (In The Mirror)",
     "Yoo2 - 无限城",
     "twenty one pilots - Christmas Saves The Year",
     "丁世光 - Simon",
     "上海彩虹室内合唱团 - 我有一个装满星星的口袋 (现场版)",
     "中川奈美 - 竈門炭治郎のうた",
     "伍佰 & China Blue - 夜照亮了夜",
     "刘岩,徐瑶,赵子璇 - 我到底是谁",
     "刺猬 - 在心间",
     "告五人,阿爆 - 新世界",
     "回春丹 - 正义",
     "国立台湾大学合唱团 - 如果明天就是下一生",
     "坂本龍一 - Solitude",
     "夏日入侵企画 - 想去海边",
     "大都会乐团 - 金都",
     "姚贝娜 - 当时",
     "宠物同谋 - Back Off",
     "岑宁儿 - 困局",
     "岛屿心情 - 影子",
     "康姆士COM'Z - 爱还是不够形容",
     "张惠妹 - 三月",
     "当代电影大师 - 我常常有一种感觉",
     "木推瓜 - 哆嗦哆",
     "杨和苏KeyNG - 兔八哥",
     "柴田淳 - 秋桜",
     "梅卡德尔 - 黑夜的秘密",
     "橘子海 (Orange Ocean) - 有暖气 (You Nuan Chi)",
     "法老 - Ghost face",
     "白皮书乐队 - 清河",
     "福禄寿FloruitShow - 如何",
     "老王乐队 - 我还年轻 我还年轻",
     "老王乐队 - 那些失眠的夜与难以忘怀的事",
     "艾怡良 - Forever Young",
     "艾热 AIR - 雾",
     "蛙池 - 哑牛",
     "袁娅维 - 嘘",
     "郑棋元 - 天边外",
     "郑棋元 - 总有一天",
     "郭顶 - 凄美地",
     "郭顶 - 落地之前",
     "野外合作社 - 爱人",
     "陈奕迅 - 那些让你死去活来的女孩"];
     var musicImgsData1 = musicUrls1;    // 图片地址数组
     var musicNameData1 = musicUrls1;                   // 歌曲名数组
     var artistNameData1 = musicUrls1;            // 创作歌手数组
    
    var musicUrls2=["Black Lab - This Night",
    "Chapterhouse - Pearl",
    "Dayglow - Run the World!!!",
    "From Your Balcony - Loneliness",
    "Joan Jett & the Blackhearts - I Hate Myself for Loving You",
    "Joy Division - Isolation [2007 Re-mastered Album Version]",
    "Led Zeppelin - Immigrant Song (2007 Remastered Version)",
    "Marilyn Manson - Sweet Dreams (Are made of This)",
    "Muse - Time Is Running Out",
    "Nicola Piovani - U-Turn (Lili)",
    "Nine Inch Nails - Head Like A Hole",
    "Noel Gallagher - Married With Children",
    "Radiohead - All I Need",
    "Radiohead - Jigsaw Falling Into Place",
    "Smash Mouth - Walkin' On The Sun",
    "Sonic Youth - Kool Thing",
    "Sonic Youth - Stones",
    "Sonic Youth - Sunday",
    "Stereophonics - Drowning",
    "Stereophonics - I Stopped To Fill My Car Up",
    "Tamino - Indigo Night",
    "The Jesus and Mary Chain - Rocket",
    "Thom Yorke - The Eraser",
    "Tommee Profitt,Fleurie - Sound Of War",
    "Travis - Love Will Come Through",
    "Two Steps From Hell - Star Sky (Instrumental)",
    "上原ひろみ - Kung-Fu World Champion",
    "大悲 - 不由",
    "海朋森 - 我进入了绝望的时期",
    "海朋森 - 春风",
    "理想后花园 - 我的身旁是一扇亮了又暗的窗"];
    var musicImgsData2 = musicUrls2;    // 图片地址数组
    var musicNameData2 = musicUrls2;                   // 歌曲名数组
    var artistNameData2 = musicUrls2;            // 创作歌手数组
     
    var musicUrls3=["$atori Zoom,KALONO - LOCK OUT",
    "99 God,小安迪LilAndy - SCUM",
    "Ayu吴浩宇,侃迪kandi - flow show （freestyle）",
    "Blanco Brown - The Git Up",
    "Caetano Veloso - The Carioca",
    "Dax - JOKER",
    "Dax - My Last Words",
    "Ed Sheeran,Eminem,50 Cent - Remember The Name (feat. Eminem & 50 Cent)",
    "EvilJoker,Ray Jack - 山口组",
    "EvilJoker,冥王星 - Eminem-Homicide Freestyle（EvilJoker ／ 冥王星 remix）",
    "GAWNE,Vin Jay,Samad Savage - Diablo",
    "Gang of Four - Damaged Goods",
    "General Elektriks - Bloodshot Eyes",
    "Jamie Berry,Octavia Rose - Lost In The Rhythm (Original Mix)",
    "Joyner Lucas - Lotto",
    "Jules Gaia - Shake Down",
    "Just A Gent - AUTOPILOT",
    "Matt Maeson - Grave Digger",
    "Muse - Algorithm",
    "NF,Sasha Sloan - Only",
    "OWEN欧阳子文 - 我不押了",
    "OWEN欧阳子文,Oliver Jiang - 别瞎艾特我",
    "Rage Against the Machine - Killing In The Name",
    "Robin Thicke,Juicy J - One Shot",
    "S.M.V. - Thunder",
    "Snoop Dogg,Russ,Wiz Khalifa - Take Me Away",
    "Tech N9ne,Chino XL,KXNG Crooked - Sickology 101",
    "The Bosshoss - Do It",
    "The Bosshoss - Dos Bros",
    "The Shanghai Restoration Project - Jessfield Park",
    "The Stanley Clarke Band - Pop Virgil",
    "TrippyThaKid,Hounds - VODKA SAUCE FREESTYLE",
    "Vin Jay - Going Off (feat. Cryptic Wisdom & Futuristic)",
    "Vin Jay - Work",
    "成都集团,马思唯,KnowKnow - 成都集团2020cypher (Prod. by HARIKIRI)",
    "方大同 - 悟空",
    "直火帮XZT,直火帮 Straight Fire Gang - 诙谐",
    "＂Weird Al＂ Yankovic - The Hamilton Polka"];
    var musicImgsData3 =  musicUrls3;    // 图片地址数组
    var musicNameData3 =  musicUrls3;                   // 歌曲名数组
    var artistNameData3 = musicUrls3;            // 创作歌手数组
    
    var musicUrls4 =[
        "$atori Zoom,KALONO - LOCK OUT",
        "99 God,小安迪LilAndy - SCUM",
        "Aaron Tveit,Kerry Butler - Seven Wonders",
        "Adam Lambert - Runnin'",
        "Adam Lambert - There I Said It",
        "Adele - Lovesong",
        "Amason - California Dreamin'",
        "Amos Milburn - Let Me Go Home, Whiskey",
        "Andrea Bocelli - Melodramma",
        "Ayu吴浩宇,侃迪kandi - flow show （freestyle）",
        "Ben Platt - Waving Through A Window",
        "Ben Platt,Kristolyn Lloyd,Will Roland - You Will Be Found",
        "Ben Platt,Lin-Manuel Miranda - Found／Tonight",
        "Beth Hart and Joe Bonamassa - I'll Take Care Of You",
        "Billie Eilish - Fingers Crossed",
        "Billie Eilish,Khalid - lovely",
        "Black Box Recorder - Rock 'n' Roll Suicide",
        "Blake Rose - Lost",
        "Blanco Brown - The Git Up",
        "Bob Seger - Old Time Rock & Roll",
        "Brandi Carlile - Creep (Live at the Avalon, Boston, MA - May 2007)",
        "Caetano Veloso - The Carioca",
        "Caro Emerald - Paris",
        "Casey Abrams,Haley Reinhart - Hit The Road Jack",
        "Chase Holfelder - Animal",
        "Chris James - The Green",
        "Chuck Berry - Big Boys",
        "Coldplay - Yellow",
        "Cosmo Sheldrake - The Moss",
        "DOROTHY - Missile",
        "Dave Not Dave - Cold Blood",
        "Dax - JOKER",
        "Dax - My Last Words",
        "Depeche Mode - Lilian",
        "Depeche Mode - The Dead Of Night",
        "Down to the Bone - Supercharged",
        "Ed Sheeran - All of the Stars",
        "Ed Sheeran - Make It Rain",
        "Ed Sheeran,Eminem,50 Cent - Remember The Name (feat. Eminem & 50 Cent)",
        "Elle King - Ex's & Oh's",
        "Eric Clapton - Old Love (Live)",
        "EvilJoker,Ray Jack - 山口组",
        "EvilJoker,冥王星 - Eminem-Homicide Freestyle（EvilJoker ／ 冥王星 remix）",
        "FINNEAS - Let's Fall in Love for the Night",
        "Fleurie - Hurts Like Hell",
        "GAWNE,Vin Jay,Samad Savage - Diablo",
        "GOX0 - 骨の女",
        "Gary Moore - I Had A Dream",
        "General Elektriks - Bloodshot Eyes",
        "Gerald Veasley - Traveling Light",
        "Gin Wigmore - Black Sheep",
        "Glen Hansard,Markéta Irglová - If You Want Me",
        "Green Day,U2 - The Saints Are Coming",
        "Hawk Nelson - Sold Out",
        "Henrik Freischlader - The Memory of Our Love",
        "Herbie Hancock - Watermelon Man",
        "Hozier - Take Me To Church",
        "Hugh Grant,Drew Barrymore - Way Back Into Love (Demo)",
        "Idina Menzel,Evan Rachel Wood - Show Yourself (From ＂Frozen 2＂／Soundtrack Version)",
        "Imagine Dragons - Dream",
        "Imagine Dragons - I’m So Sorry",
        "Isaac Gracie - Darkness Of The Day",
        "Isaac Gracie - Silhouettes Of You",
        "Isaac Gracie - terrified",
        "Isaac Gracie - that was then",
        "James Bay - Bad",
        "Jason Mraz - Bella Luna",
        "Jason Mraz - Life Is Wonderful (Live in Amsterdam)",
        "Jason Mraz - Living In The Moment",
        "Jason Mraz - Plane",
        "Jeremy Jordan - Moving Too Fast",
        "Joe Robinson - Lethal Injection",
        "John Grant - Grey Tickles, Black Pressure",
        "John Legend - Who Did That to You？",
        "John Scofield,John Mayer - I Don't Need No Doctor",
        "Jose De Castro - Fiesta Funk",
        "Joyner Lucas - Lotto",
        "June Noa - If I Ever Leave You",
        "Just A Gent - AUTOPILOT",
        "Justin Timberlake,Carey Mulligan,Stark Sands - Five Hundred Miles",
        "KALEO - Hot Blood",
        "KALEO - I Can't Go On Without You",
        "Kate Rusby - I Am Stretched On Your Grave",
        "Led Zeppelin - Stairway to Heaven (Remaster)",
        "Les Claypool - The Awakening",
        "Lewis Capaldi - Someone You Loved",
        "LiSA - unlasting",
        "Lily Marks,Devin Lytle,Joey Richter - Goin' Back to Hogwarts",
        "Lin-Manuel Miranda,Renée Elise Goldsberry,Phillipa Soo - It's Quiet Uptown",
        "Mandarin - 茧",
        "Mando Diao - Brother",
        "Mando Diao - Dance With Somebody (Live)",
        "Mando Diao - Losing My Mind (Live)",
        "Mando Diao - Sheepdog (Live)",
        "Matt Maeson - Grave Digger",
        "Matthew Morrison,Aidan Gemme - When Your Feet Don’t Touch The Ground (Original Broadway Cast Recording)",
        "Matthew Perryman Jones - Living in the Shadows",
        "Michael Bublé - Dream a Little Dream of Me",
        "Michael Bublé - Kissing A Fool",
        "Mighty Mo Rodgers - Continental Blues",
        "Morphine - French Fries With Pepper",
        "Mr. Big - To Be With You",
        "Muse - Algorithm",
        "Muse - Sing for Absolution",
        "Muse - The Dark Side",
        "Muse - The Void",
        "Muse - Unintended",
        "MØ - New Year's Eve",
        "NF,Sasha Sloan - Only",
        "Nirvana - Lithium",
        "OWEN欧阳子文 - 我不押了",
        "OWEN欧阳子文,Oliver Jiang - 别瞎艾特我",
        "Oasis - Don't Look Back in Anger",
        "OneRepublic - Made for You",
        "Parker Millsap - Heaven Sent",
        "Paul McCartney,Eric Clapton - While My Guitar Gently Weeps",
        "Pilot Speed - Alright",
        "Pink Floyd - Mother",
        "Polyphia - Nightmare",
        "Radiohead - Bodysnatchers",
        "Radiohead - Creep",
        "Radiohead - Exit Music (For a Film)",
        "Rage Against the Machine - Killing In The Name",
        "Ray Charles,Elton John - Sorry Seems to Be the Hardest Word",
        "Richard Lewis - Where the Willows Grow",
        "Robin Thicke,Juicy J - One Shot",
        "Ruck P - Soul Food",
        "Russell Crowe - Stars",
        "Ryan Gosling - City of Stars",
        "S.M.V. - Thunder",
        "Sam Tinnesz - Play with Fire (feat. Yacht Money)",
        "Sara Bareilles - She Used To Be Mine",
        "Seal - Stand By Me [Live]",
        "Sex Pistols - Rock Around the Clock",
        "Silya & The Sailors - Become My Dream",
        "Snoop Dogg,Russ,Wiz Khalifa - Take Me Away",
        "Sonic Youth - 'Cross the Breeze",
        "Sonic Youth - Anti-Orgasm",
        "Stereophonics - Indian Summer",
        "Stereophonics - Nothing Precious At All",
        "Stereophonics - Since I Told You It's Over",
        "Suede - Life is Golden",
        "Suede - The Power",
        "Tech N9ne,Chino XL,KXNG Crooked - Sickology 101",
        "The Bosshoss - Do It",
        "The Bosshoss - Dos Bros",
        "The Killers - Sam's Town (Acoustic) (Live From The Royal Albert Hall ／ 2009)",
        "The Kinks - Alcohol",
        "The Rolling Stones - Paint It, Black",
        "The Stanley Clarke Band - Pop Virgil",
        "The Stone Roses - Made Of Stone",
        "The Weeknd - Blinding Lights",
        "Tim Kamrad - Changes",
        "Tinsley Ellis - Kiss Of Death",
        "Tinsley Ellis - To the Devil for a Dime",
        "Tony O'Malley - Autumn Leaves",
        "Travis - New Shoes",
        "Travis - Quicksand",
        "Travis - Valentine",
        "TrippyThaKid,Hounds - VODKA SAUCE FREESTYLE",
        "Vansire - Halcyon Age",
        "Vin Jay - Going Off (feat. Cryptic Wisdom & Futuristic)",
        "Vin Jay - Work",
        "Yanni - Nei Tuoi Occhi (In The Mirror)",
        "twenty one pilots - Christmas Saves The Year",
        "丁世光 - Simon",
        "伍佰 & China Blue - 夜照亮了夜",
        "刺猬 - 在心间",
        "告五人,阿爆 - 新世界",
        "回春丹 - 正义",
        "夏日入侵企画 - 想去海边",
        "大都会乐团 - 金都",
        "岛屿心情 - 影子",
        "康姆士COM'Z - 爱还是不够形容",
        "张惠妹 - 三月",
        "当代电影大师 - 我常常有一种感觉",
        "成都集团,马思唯,KnowKnow - 成都集团2020cypher (Prod. by HARIKIRI)",
        "方大同 - 悟空",
        "木推瓜 - 哆嗦哆",
        "杨和苏KeyNG - 兔八哥",
        "梅卡德尔 - 黑夜的秘密",
        "橘子海 (Orange Ocean) - 有暖气 (You Nuan Chi)",
        "法老 - Ghost face",
        "白皮书乐队 - 清河",
        "直火帮XZT,直火帮 Straight Fire Gang - 诙谐",
        "福禄寿FloruitShow - 如何",
        "老王乐队 - 我还年轻 我还年轻",
        "老王乐队 - 那些失眠的夜与难以忘怀的事",
        "艾热 AIR - 雾",
        "蛙池 - 哑牛",
        "郑棋元 - 天边外",
        "郑棋元 - 总有一天",
        "郭顶 - 凄美地",
        "郭顶 - 落地之前",
        "陈奕迅 - 那些让你死去活来的女孩",
        "＂Weird Al＂ Yankovic - The Hamilton Polka"
    ];
    var musicImgsData4 = musicUrls4;    // 图片地址数组
    var musicNameData4 = musicUrls4;                   // 歌曲名数组
    var artistNameData4 = musicUrls4;            // 创作歌手数组
     

    var musicUrls5=["A Toys Orchestra - Panic attack #3",
    "Adam Lambert - Feeling Good (American Idol Studio Version)",
    "Adele - Lovesong",
    "Aerosmith - Dream On",
    "Andrea Bocelli - Bésame Mucho",
    "Belarus - In The End Its Easy",
    "Blake Rose - Lost",
    "Buddy Holly - Everyday",
    "Caro Emerald - Paris",
    "Casey Abrams,Haley Reinhart - Hit The Road Jack",
    "Chris James - The Green",
    "Chuck Berry - Big Boys",
    "Concha Buika - Las Simples Cosas",
    "Cosmo Sheldrake - The Moss",
    "Cosmo Sheldrake,Andrea Vargas - Orby",
    "DIIV - Doused",
    "Down to the Bone - Supercharged",
    "Editors - No Sound But the Wind",
    "Ernesto Romeo,Andrés Linetzky - Sentimentos",
    "Evan Rachel Wood - All Is Found (From ＂Frozen 2＂／Soundtrack Version)",
    "FINNEAS - Let's Fall in Love for the Night",
    "Fleurie - Breathe",
    "Floating Points - Falaise",
    "Frank Wildhorn - Take Me As I Am",
    "From Your Balcony - That inferior feeling",
    "Gerald Veasley - Traveling Light",
    "Herbie Hancock - Watermelon Man",
    "Isaac Gracie - Darkness Of The Day",
    "James Bay - Bad",
    "Jason Mraz - Mr. Curiosity",
    "Joe Robinson - Lethal Injection",
    "KALEO - Way Down We Go (Stripped)",
    "Lady Gaga - I'll Never Love Again (Extended Version - Radio Edit)",
    "Lady Gaga,Bradley Cooper - I'll Never Love Again (Film Version)",
    "Lewis Capaldi - Forever",
    "Lily Marks,Devin Lytle,Joey Richter - Goin' Back to Hogwarts",
    "Linkin Park - Crawling (One More Light Live)",
    "Makeup and Vanity Set - The Prophet",
    "Mandarin - 摇篮曲 Cradle Song",
    "Michael Bublé - Kissing A Fool",
    "Michael Bublé - You Belong To Me",
    "Mighty Mo Rodgers - Continental Blues",
    "Miles Davis - So What",
    "Muse - Exogenesis： Symphony Part 3 (Redemption)",
    "Muse - Supremacy",
    "Muse - The 2nd Law： Isolated System",
    "NeoHuman - Uncaged Mind",
    "Nirvana - Lithium",
    "No Spirit - Slightly Improvised",
    "Pink Floyd - Eclipse",
    "Polyphia - Nightmare",
    "Radiohead - Last Flowers",
    "Radiohead - Sail To the Moon",
    "Ruben Wan - Pure Imagination",
    "Ruck P - Soul Food",
    "Ryan Gosling - City of Stars",
    "Sam Tinnesz - Play with Fire (feat. Yacht Money)",
    "Secession Studios - The Untold",
    "Stereophonics - Sunny",
    "The Czars - Roger's Song",
    "The KVB - Across the Sea",
    "The Shanghai Restoration Project,张乐 - Paris of the East (feat. Zhou Yi)",
    "Thom Yorke - Guess Again!",
    "Thom Yorke - Suspirium",
    "Tim Kamrad - Changes",
    "Tinsley Ellis - Kiss Of Death",
    "Tony O'Malley - Autumn Leaves",
    "Vansire - KW",
    "Yoo2 - 无限城",
    "上海彩虹室内合唱团 - 我有一个装满星星的口袋 (现场版)",
    "中川奈美 - 竈門炭治郎のうた",
    "刘岩,徐瑶,赵子璇 - 我到底是谁",
    "告五人,阿爆 - 新世界",
    "国立台湾大学合唱团 - 如果明天就是下一生",
    "坂本龍一 - Solitude",
    "大都会乐团 - 金都",
    "姚贝娜 - 当时",
    "宠物同谋 - Back Off",
    "岑宁儿 - 困局",
    "木推瓜 - 哆嗦哆",
    "杨和苏KeyNG - 兔八哥",
    "柴田淳 - 秋桜",
    "法老 - Ghost face",
    "老王乐队 - 我还年轻 我还年轻",
    "艾怡良 - Forever Young",
    "袁娅维 - 嘘",
    "野外合作社 - 爱人"];
    var musicImgsData5 =  musicUrls5;    // 图片地址数组
    var musicNameData5 =  musicUrls5;                   // 歌曲名数组
    var artistNameData5 = musicUrls5; 
    
    var musicUrls6=["A Toys Orchestra - Panic attack #3",
    "Adam Lambert - Feeling Good (American Idol Studio Version)",
    "Aerosmith - Dream On",
    "Andrea Bocelli - Bésame Mucho",
    "Belarus - In The End Its Easy",
    "Buddy Holly - Everyday",
    "Concha Buika - Las Simples Cosas",
    "Cosmo Sheldrake,Andrea Vargas - Orby",
    "DIIV - Doused",
    "Editors - No Sound But the Wind",
    "Ernesto Romeo,Andrés Linetzky - Sentimentos",
    "Evan Rachel Wood - All Is Found (From ＂Frozen 2＂／Soundtrack Version)",
    "Fleurie - Breathe",
    "Floating Points - Falaise",
    "Frank Wildhorn - Take Me As I Am",
    "From Your Balcony - That inferior feeling",
    "Jason Mraz - Mr. Curiosity",
    "KALEO - Way Down We Go (Stripped)",
    "Lady Gaga - I'll Never Love Again (Extended Version - Radio Edit)",
    "Lady Gaga,Bradley Cooper - I'll Never Love Again (Film Version)",
    "Lewis Capaldi - Forever",
    "Linkin Park - Crawling (One More Light Live)",
    "Makeup and Vanity Set - The Prophet",
    "Mandarin - 摇篮曲 Cradle Song",
    "Michael Bublé - You Belong To Me",
    "Miles Davis - So What",
    "Muse - Exogenesis： Symphony Part 3 (Redemption)",
    "Muse - Supremacy",
    "Muse - The 2nd Law： Isolated System",
    "NeoHuman - Uncaged Mind",
    "No Spirit - Slightly Improvised",
    "Pink Floyd - Eclipse",
    "Radiohead - Last Flowers",
    "Radiohead - Sail To the Moon",
    "Ruben Wan - Pure Imagination",
    "Secession Studios - The Untold",
    "Stereophonics - Sunny",
    "The Czars - Roger's Song",
    "The KVB - Across the Sea",
    "The Shanghai Restoration Project,张乐 - Paris of the East (feat. Zhou Yi)",
    "Thom Yorke - Guess Again!",
    "Thom Yorke - Suspirium",
    "Vansire - KW",
    "Yoo2 - 无限城",
    "上海彩虹室内合唱团 - 我有一个装满星星的口袋 (现场版)",
    "中川奈美 - 竈門炭治郎のうた",
    "刘岩,徐瑶,赵子璇 - 我到底是谁",
    "国立台湾大学合唱团 - 如果明天就是下一生",
    "坂本龍一 - Solitude",
    "姚贝娜 - 当时",
    "宠物同谋 - Back Off",
    "岑宁儿 - 困局",
    "柴田淳 - 秋桜",
    "艾怡良 - Forever Young",
    "袁娅维 - 嘘",
    "野外合作社 - 爱人"]
    var musicImgsData6 =  musicUrls6;    // 图片地址数组
    var musicNameData6 =  musicUrls6;                   // 歌曲名数组
    var artistNameData6 = musicUrls6;

    var musicUrls7=[ "$atori Zoom,KALONO - LOCK OUT",
    "99 God - FLIGHT MODE",
    "99 God - GALA",
    "99 God - Sandwich",
    "99 God,小安迪LilAndy - SCUM",
    "A Toys Orchestra - Panic attack #3",
    "AWOLNATION - Jailbreak",
    "Aaron Tveit,Kerry Butler - Seven Wonders",
    "Adam Lambert - Closer To You",
    "Adam Lambert - Feeling Good (American Idol Studio Version)",
    "Adam Lambert - Runnin'",
    "Adam Lambert - There I Said It",
    "Adele - Lovesong",
    "Aerosmith - Dream On",
    "AloviL - 猫又",
    "Amason - California Dreamin'",
    "Amos Milburn - Let Me Go Home, Whiskey",
    "Andrea Bocelli - Bésame Mucho",
    "Andrea Bocelli - Melodramma",
    "Andy Tubman - Quiet Inside",
    "Anthony Hamilton,Elayna Boynton - Freedom",
    "Anti-General - Billie Eilish-bury a friend (Anti-General Redark)",
    "Ayu吴浩宇,侃迪kandi - flow show （freestyle）",
    "Ayu吴浩宇,侃迪kandi - 山顶见",
    "Bazzi - Myself",
    "Belarus - In The End Its Easy",
    "Ben Platt - Waving Through A Window",
    "Ben Platt,Kristolyn Lloyd,Will Roland - You Will Be Found",
    "Ben Platt,Lin-Manuel Miranda - Found／Tonight",
    "Ben l'oncle Soul - Seven Nation Army",
    "Beth Hart - Am I The One (LP Version)",
    "Beth Hart and Joe Bonamassa - I'll Take Care Of You",
    "BigYao - 归土",
    "Billie Eilish - Fingers Crossed",
    "Billie Eilish,Khalid - lovely",
    "Biz,HUNTRR - Church (Original Mix)",
    "Black Box Recorder - Rock 'n' Roll Suicide",
    "Black Lab - This Night",
    "Blake Rose - Lost",
    "Blanco Brown - The Git Up",
    "Bleachers - Goodmorning",
    "Bob Seger - Old Time Rock & Roll",
    "Boz Scaggs - Miss Riddle",
    "Brandi Carlile - Creep (Live at the Avalon, Boston, MA - May 2007)",
    "Brian Culbertson,Marcus Miller,Steve Cole - Midnight (feat. Marcus Miller & Steve Cole)",
    "Buddy Holly - Everyday",
    "Caetano Veloso - The Carioca",
    "Cannons - Baby",
    "Caro Emerald - Paris",
    "Casey Abrams,Haley Reinhart - Hit The Road Jack",
    "Chantal Chamberland - Besame mucho",
    "Chapterhouse - Pearl",
    "Chase Holfelder - Animal",
    "Chris James - The Green",
    "Chromeo - Over Your Shoulder",
    "Chuck Berry - Big Boys",
    "Coldplay - Yellow",
    "Concha Buika - Las Simples Cosas",
    "Cosmo Sheldrake - The Moss",
    "Cosmo Sheldrake,Andrea Vargas - Orby",
    "DENCHO - Tired",
    "DIIV - Doused",
    "DOROTHY - Missile",
    "Dave Not Dave - Cold Blood",
    "Dax - JOKER",
    "Dax - My Last Words",
    "Dayglow - Run the World!!!",
    "Deluxe - Tall Ground",
    "Depeche Mode - Lilian",
    "Depeche Mode - The Dead Of Night",
    "Down to the Bone - Supercharged",
    "Ed Sheeran - All of the Stars",
    "Ed Sheeran - Make It Rain",
    "Ed Sheeran,Eminem,50 Cent - Remember The Name (feat. Eminem & 50 Cent)",
    "Editors - No Sound But the Wind",
    "EighteenM木十八,孙韬智,YQbeef - 南昌大学2020CYPHER",
    "Elle King - Ex's & Oh's",
    "Eric Clapton - Old Love (Live)",
    "Ernesto Romeo,Andrés Linetzky - Sentimentos",
    "Eternity forever - Fantasy",
    "Evan Rachel Wood - All Is Found (From ＂Frozen 2＂／Soundtrack Version)",
    "EvilJoker,Ray Jack - 山口组",
    "EvilJoker,冥王星 - Eminem-Homicide Freestyle（EvilJoker ／ 冥王星 remix）",
    "FINNEAS - Let's Fall in Love for the Night",
    "Fleurie - Breathe",
    "Fleurie - Hurts Like Hell",
    "Floating Points - Falaise",
    "Foreign Air - Free Animal",
    "Frank Wildhorn - Take Me As I Am",
    "From Your Balcony - Loneliness",
    "From Your Balcony - That inferior feeling",
    "GAWNE,Vin Jay,Samad Savage - Diablo",
    "GOX0 - 骨の女",
    "Galimatias - South",
    "Gang of Four - Damaged Goods",
    "Gary Moore - I Had A Dream",
    "General Elektriks - Bloodshot Eyes",
    "General Elektriks - Rebel Sun",
    "Gerald Veasley - Traveling Light",
    "Gin Wigmore - Black Sheep",
    "Glen Hansard,Markéta Irglová - If You Want Me",
    "Gorillaz,Kali Uchis - She's My Collar",
    "Green Day,U2 - The Saints Are Coming",
    "Hawk Nelson - Sold Out",
    "Henrik Freischlader - The Memory of Our Love",
    "Herbie Hancock - Watermelon Man",
    "Hozier - Take Me To Church",
    "Hugh Grant,Drew Barrymore - Way Back Into Love (Demo)",
    "Idina Menzel,Evan Rachel Wood - Show Yourself (From ＂Frozen 2＂／Soundtrack Version)",
    "Imagine Dragons - Dream",
    "Imagine Dragons - I’m So Sorry",
    "Isaac Gracie - Darkness Of The Day",
    "Isaac Gracie - Silhouettes Of You",
    "Isaac Gracie - terrified",
    "Isaac Gracie - that was then",
    "Jackie Greene - I Don’t Live In A Dream",
    "James Bay - Bad",
    "Jamie Berry,Octavia Rose - Lost In The Rhythm (Original Mix)",
    "Jason Mraz - Bella Luna",
    "Jason Mraz - Life Is Wonderful (Live in Amsterdam)",
    "Jason Mraz - Living In The Moment",
    "Jason Mraz - Mr. Curiosity",
    "Jason Mraz - Plane",
    "Jeremy Jordan - Moving Too Fast",
    "Joan Jett & the Blackhearts - I Hate Myself for Loving You",
    "Joe Robinson - Lethal Injection",
    "Joey Pecoraro - Finding Parking",
    "John Grant - Grey Tickles, Black Pressure",
    "John Legend - Who Did That to You？",
    "John Scofield,John Mayer - I Don't Need No Doctor",
    "Jose De Castro - Fiesta Funk",
    "Joy Division - Isolation [2007 Re-mastered Album Version]",
    "Joyner Lucas - Lotto",
    "Jules Gaia - Shake Down",
    "June Noa - If I Ever Leave You",
    "Just A Gent - AUTOPILOT",
    "Justin Timberlake,Carey Mulligan,Stark Sands - Five Hundred Miles",
    "KALEO - Hot Blood",
    "KALEO - I Can't Go On Without You",
    "KALEO - Way Down We Go (Stripped)",
    "Karen Souza - Tainted Love",
    "Kate Rusby - I Am Stretched On Your Grave",
    "Keb' Mo' - The Itch",
    "Kristin Chenoweth,Idina Menzel - Defying Gravity (From ＂Wicked＂ Original Broadway Cast Recording／2003)",
    "LAKEY INSPIRED - Blossom",
    "LAKEY INSPIRED - Elevate",
    "Lady Gaga - I'll Never Love Again (Extended Version - Radio Edit)",
    "Lady Gaga,Bradley Cooper - I'll Never Love Again (Film Version)",
    "Led Zeppelin - Immigrant Song (2007 Remastered Version)",
    "Led Zeppelin - Stairway to Heaven (Remaster)",
    "Les Claypool - The Awakening",
    "Lewis Capaldi - Forever",
    "Lewis Capaldi - Someone You Loved",
    "Lexi Lawson,Ari Afsar,Rachelle Ann Go - First Burn",
    "LiSA - unlasting",
    "Lily Marks,Devin Lytle,Joey Richter - Goin' Back to Hogwarts",
    "Lin-Manuel Miranda,Renée Elise Goldsberry,Phillipa Soo - It's Quiet Uptown",
    "Linkin Park - Crawling (One More Light Live)",
    "Lorde - Liability",
    "Machine Gun Kelly,Kid Rock - Bad Mother F＊cker",
    "Madi Marie - grief",
    "Makeup and Vanity Set - The Prophet",
    "Mandarin - 摇篮曲 Cradle Song",
    "Mandarin - 茧",
    "Mando Diao - Brother",
    "Mando Diao - Dance With Somebody (Live)",
    "Mando Diao - Losing My Mind (Live)",
    "Mando Diao - Shake",
    "Mando Diao - Sheepdog (Live)",
    "Marilyn Manson - Sweet Dreams (Are made of This)",
    "Matt Maeson - Grave Digger",
    "Matthew Morrison,Aidan Gemme - When Your Feet Don’t Touch The Ground (Original Broadway Cast Recording)",
    "Matthew Perryman Jones - Living in the Shadows",
    "Michael Bublé - Dream a Little Dream of Me",
    "Michael Bublé - Kissing A Fool",
    "Michael Bublé - You Belong To Me",
    "Mighty Mo Rodgers - Continental Blues",
    "Miles Davis - So What",
    "Morphine - French Fries With Pepper",
    "Mr. Big - To Be With You",
    "Muse - Algorithm",
    "Muse - Exogenesis： Symphony Part 3 (Redemption)",
    "Muse - Sing for Absolution",
    "Muse - Supremacy",
    "Muse - The 2nd Law： Isolated System",
    "Muse - The Dark Side",
    "Muse - The Void",
    "Muse - Time Is Running Out",
    "Muse - Unintended",
    "MØ - New Year's Eve",
    "NF,Sasha Sloan - Only",
    "NeoHuman - Uncaged Mind",
    "Nicola Piovani - U-Turn (Lili)",
    "Nine Inch Nails - Head Like A Hole",
    "Nirvana - Lithium",
    "No Spirit - Slightly Improvised",
    "Noel Gallagher - Married With Children",
    "OWEN欧阳子文 - 我不押了",
    "OWEN欧阳子文,Oliver Jiang - 别瞎艾特我",
    "Oasis - Don't Look Back in Anger",
    "OneRepublic - Everybody Loves Me",
    "OneRepublic - Made for You",
    "Otros Aires - Otra Noche En La Viruta",
    "PO - [付费]Greed-贪婪 日本和风Trap Beat",
    "Parker Millsap - Heaven Sent",
    "Paul McCartney,Eric Clapton - While My Guitar Gently Weeps",
    "Pilot Speed - Alright",
    "Pink Floyd - Eclipse",
    "Pink Floyd - Mother",
    "Polyphia - Bittersweet",
    "Polyphia - Nightmare",
    "Post Malone,Swae Lee - Sunflower (Spider-Man： Into the Spider-Verse)",
    "Radiohead - 15 Step",
    "Radiohead - All I Need",
    "Radiohead - Bodysnatchers",
    "Radiohead - Creep",
    "Radiohead - Exit Music (For a Film)",
    "Radiohead - Jigsaw Falling Into Place",
    "Radiohead - Last Flowers",
    "Radiohead - Sail To the Moon",
    "Rag'N'Bone Man - Disfigured",
    "Rage Against the Machine - Killing In The Name",
    "Ray Charles,Elton John - Sorry Seems to Be the Hardest Word",
    "Richard Lewis - Where the Willows Grow",
    "Robin Thicke,Juicy J - One Shot",
    "Ruben Wan - Pure Imagination",
    "Ruck P - Destination",
    "Ruck P - Soul Food",
    "Russell Crowe - Stars",
    "Ryan Gosling - City of Stars",
    "S.M.V. - Thunder",
    "SIX GOD - 魔笛",
    "Sam Tinnesz - Play with Fire (feat. Yacht Money)",
    "Sara Bareilles - She Used To Be Mine",
    "Seal - Stand By Me [Live]",
    "Secession Studios - The Untold",
    "Sex Pistols - Rock Around the Clock",
    "Shanghai Phantom,A.D.C - Du Yueh-Sheng",
    "Silya & The Sailors - Become My Dream",
    "Slumberjack - RA",
    "Smash Mouth - Walkin' On The Sun",
    "Snoop Dogg,Russ,Wiz Khalifa - Take Me Away",
    "Sonic Youth - 'Cross the Breeze",
    "Sonic Youth - Anti-Orgasm",
    "Sonic Youth - Kool Thing",
    "Sonic Youth - Stones",
    "Sonic Youth - Sunday",
    "Stereophonics - Drowning",
    "Stereophonics - I Stopped To Fill My Car Up",
    "Stereophonics - Indian Summer",
    "Stereophonics - Nothing Precious At All",
    "Stereophonics - Since I Told You It's Over",
    "Stereophonics - Sunny",
    "Suede - Life is Golden",
    "Suede - The Power",
    "T-K - 青行灯",
    "Tamino - Indigo Night",
    "Tech N9ne,Chino XL,KXNG Crooked - Sickology 101",
    "The Bosshoss - Do It",
    "The Bosshoss - Dos Bros",
    "The Czars - Roger's Song",
    "The Jesus and Mary Chain - Rocket",
    "The KVB - Across the Sea",
    "The Killers - Sam's Town (Acoustic) (Live From The Royal Albert Hall ／ 2009)",
    "The Kinks - Alcohol",
    "The Rolling Stones - Paint It, Black",
    "The Shanghai Restoration Project - Jessfield Park",
    "The Shanghai Restoration Project,张乐 - Paris of the East (feat. Zhou Yi)",
    "The Stanley Clarke Band - Pop Virgil",
    "The Stone Roses - Made Of Stone",
    "The Weeknd - Blinding Lights",
    "The Weeknd - Twenty Eight",
    "Thom Yorke - Black Swan",
    "Thom Yorke - Guess Again!",
    "Thom Yorke - Not the News",
    "Thom Yorke - Suspirium",
    "Thom Yorke - The Eraser",
    "Thom Yorke - Twist",
    "Tim Kamrad - Changes",
    "Tinsley Ellis - Kiss Of Death",
    "Tinsley Ellis - To the Devil for a Dime",
    "Tom Misch - Movie",
    "Tommee Profitt,Fleurie - Sound Of War",
    "Tony O'Malley - Autumn Leaves",
    "Travis - Love Will Come Through",
    "Travis - New Shoes",
    "Travis - Quicksand",
    "Travis - Valentine",
    "TrippyThaKid - UH HUH (prod. ZCR)",
    "TrippyThaKid,Hounds - VODKA SAUCE FREESTYLE",
    "TroyBoi - Grimey",
    "Two Feet - Felt like playing guitar and not singing part 2",
    "Two Feet - Love Is a Bitch",
    "Two Feet - Love Is a ＊＊＊＊＊",
    "Two Steps From Hell - Star Sky (Instrumental)",
    "Vansire - Halcyon Age",
    "Vansire - KW",
    "Vin Jay - Going Off (feat. Cryptic Wisdom & Futuristic)",
    "Vin Jay - Out My Way",
    "Vin Jay - Work",
    "Wanbless - 恭迎聖駕",
    "Y2K,bbno$ - Lalala",
    "Yanni - Nei Tuoi Occhi (In The Mirror)",
    "Yeegoo - 菊与刀",
    "Yoo2 - 无限城",
    "Young Fathers - Sirens",
    "twenty one pilots - Christmas Saves The Year",
    "丁世光 - Simon",
    "上原ひろみ - Kung-Fu World Champion",
    "上海彩虹室内合唱团 - 我有一个装满星星的口袋 (现场版)",
    "中川奈美 - 竈門炭治郎のうた",
    "于贞 - 粒子们",
    "伍佰 & China Blue - 夜照亮了夜",
    "刘岩,徐瑶,赵子璇 - 我到底是谁",
    "刺猬 - 在心间",
    "告五人,阿爆 - 新世界",
    "回春丹 - 正义",
    "国立台湾大学合唱团 - 如果明天就是下一生",
    "坂本龍一 - Solitude",
    "夏日入侵企画 - 想去海边",
    "大悲 - 不由",
    "大都会乐团 - 金都",
    "姚贝娜 - 当时",
    "宠物同谋 - Back Off",
    "宠物同谋 - Flowers",
    "宠物同谋 - Nothing to do",
    "岑宁儿 - 困局",
    "岛屿心情 - 影子",
    "幼稚园杀手 - 反弹琵琶",
    "康姆士COM'Z - 爱还是不够形容",
    "张惠妹 - 三月",
    "当代电影大师 - 我常常有一种感觉",
    "成都集团,马思唯,KnowKnow - 成都集团2020cypher (Prod. by HARIKIRI)",
    "方大同 - 悟空",
    "木推瓜 - 哆嗦哆",
    "朴树 - 妈妈，我",
    "杨和苏KeyNG - 兔八哥",
    "柴田淳 - 東京",
    "柴田淳 - 秋桜",
    "梅卡德尔 - 黑夜的秘密",
    "橘子海 (Orange Ocean) - 有暖气 (You Nuan Chi)",
    "江河老师 - JiangHe Swing Jazz",
    "法老 - Ghost face",
    "海朋森 - 我进入了绝望的时期",
    "海朋森 - 春风",
    "理想后花园 - 我的身旁是一扇亮了又暗的窗",
    "白皮书乐队 - 清河",
    "直火帮XZT,直火帮 Straight Fire Gang - 诙谐",
    "神山羊 - YELLOW",
    "福禄寿FloruitShow - 如何",
    "福禄寿FloruitShow - 没咯",
    "老王乐队 - 我还年轻 我还年轻",
    "老王乐队 - 那些失眠的夜与难以忘怀的事",
    "艾怡良 - Forever Young",
    "艾热 AIR - 雾",
    "蛙池 - 哑牛",
    "袁娅维 - 嘘",
    "郑棋元 - 天边外",
    "郑棋元 - 总有一天",
    "郭顶 - 凄美地",
    "郭顶 - 落地之前",
    "野外合作社 - 爱人",
    "阿爆 - mainu sun 找路",
    "陈奕迅 - 那些让你死去活来的女孩",
    "＂Weird Al＂ Yankovic - The Hamilton Polka"];
    var musicImgsData7  =  musicUrls7;    // 图片地址数组
    var musicNameData7  =  musicUrls7;                   // 歌曲名数组
    var artistNameData7 = musicUrls7;


    for(i=0;i<musicUrls0.length;i++){
        musicUrls0[i]="mp3/"+musicUrls0[i]+".mp3";
    }
    for(i=0;i<musicUrls1.length;i++){
        musicUrls1[i]="mp3/"+musicUrls1[i]+".mp3";
    }
    for(i=0;i<musicUrls2.length;i++){
        musicUrls2[i]="mp3/"+musicUrls2[i]+".mp3";
    }
    for(i=0;i<musicUrls3.length;i++){
        musicUrls3[i]="mp3/"+musicUrls3[i]+".mp3";
    }
    for(i=0;i<musicUrls4.length;i++){
        musicUrls4[i]="mp3/"+musicUrls4[i]+".mp3";
    }for(i=0;i<musicUrls5.length;i++){
        musicUrls5[i]="mp3/"+musicUrls5[i]+".mp3";
    }
    for(i=0;i<musicUrls6.length;i++){
        musicUrls6[i]="mp3/"+musicUrls6[i]+".mp3";
    }
    for(i=0;i<musicUrls7.length;i++){
        musicUrls7[i]="mp3/"+musicUrls7[i]+".mp3";
    }
    var currIndex = -1;              // 当前播放索引
    
    var buffInterval = null          // 初始化定时器 判断是否需要缓冲
    var len = musicNameData0.length;  // 歌曲长度
 
    //用户菜单的实现
    var obox = document.getElementById("box");
    var odown = document.getElementById("user");
    var oli = document.querySelectorAll("li");
    var timer;
    console.log(oli);

    var mood=7;
    var count=0;

    
    //当点击obox时，呈现出下拉列表的内容，给个延时效果
    obox.onmouseover = function(){
        clearInterval(timer);
        timer = setInterval(function(){
            odown.style.display ="block";
        },300)
        
        ///选中列表中的某一项并将其呈现在box中,隐藏下拉列表
        
        for( var i=0;i<oli.length;i++){
            oli[i].index = i;
            oli[i].onclick = function(){
                mood = this.index;
                
                console.log(count)
                console.log(mood);
                obox.innerHTML = this.innerHTML;
                odown.style.display = "none";
                clearInterval(timer);
                if(count>=1)
                    location.reload();
                count++;
                //if(mood!=old_mood)    
                //oli[i].n = i;
                //mood=oli[i].n;              
                //传mood的值来
                //old_mood=mood;
            }   
        }
        
    }
    
    //document.getElementById("form1").value=mood;

    // 点击 播放/暂停 按钮，触发该函数
    // 作用：根据audio的paused属性 来检测当前音频是否已暂停  true:暂停  false:播放中
    function playPause(){
        if(audio.paused){
            playerContent1.addClass('active'); // 内容栏上移
            musicImgs.addClass('active');      // 左侧图片开始动画效果
            playPauseBtn.attr('class','btn play-pause icon-zanting iconfont') // 显示暂停图标
            checkBuffering(); // 检测是否需要缓冲
            audio.play();     // 播放
        }else{
            playerContent1.removeClass('active'); // 内容栏下移
            musicImgs.removeClass('active');      // 左侧图片停止旋转等动画效果
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放按钮
            clearInterval(buffInterval);          // 清除检测是否需要缓冲的定时器
            musicImgs.removeClass('buffering');    // 移除缓冲类名
            audio.pause(); // 暂停
        }  
    }


    // 鼠标移动在进度条上， 触发该函数	
	function showHover(event1){
		seekBarPos = sArea.offset();    // 获取进度条长度
		seekT = event1.clientX - seekBarPos.left;  //获取当前鼠标在进度条上的位置
		seekLoc = audio.duration * (seekT / sArea.outerWidth()); //当前鼠标位置的音频播放秒数： 音频长度(单位：s)*（鼠标在进度条上的位置/进度条的宽度）
		
		sHover.width(seekT);  //设置鼠标移动到进度条上变暗的部分宽度
		
		cM = seekLoc / 60;    // 计算播放了多少分钟： 音频播放秒速/60
		
		ctMinutes = Math.floor(cM);  // 向下取整
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60); // 计算播放秒数
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);  // 设置鼠标移动到进度条上显示的信息
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);  // 淡入效果显示
		
	}

    // 鼠标移出进度条，触发该函数
    function hideHover()
	{
        sHover.width(0);  // 设置鼠标移动到进度条上变暗的部分宽度 重置为0
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0); // 淡出效果显示
    }

    // 鼠标点击进度条，触发该函数
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc; // 设置音频播放时间 为当前鼠标点击的位置时间
		seekBar.width(seekT);        // 设置进度条播放长度，为当前鼠标点击的长度
		hideHover();                 // 调用该函数，隐藏原来鼠标移动到上方触发的进度条阴影
    }

    // 在音频的播放位置发生改变是触发该函数
    function updateCurrTime()
	{
        nTime = new Date();      // 获取当前时间
        nTime = nTime.getTime(); // 将该时间转化为毫秒数

        // 计算当前音频播放的时间
		curMinutes = Math.floor(audio.currentTime  / 60);
        curSeconds = Math.floor(audio.currentTime  - curMinutes * 60);
        
		// 计算当前音频总时间
		durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);
        
		// 计算播放进度百分比
		playProgress = (audio.currentTime  / audio.duration) * 100;
        
        // 如果时间为个位数，设置其格式
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            totalTime.text('00:00');
        else
		    totalTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            time.removeClass('active');
        else
            time.addClass('active');

        // 设置播放进度条的长度
		seekBar.width(playProgress+'%');
        
        // 进度条为100 即歌曲播放完时
		if( playProgress == 100 )
		{
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放按钮
			seekBar.width(0);              // 播放进度条重置为0
            tProgress.text('00:00');       // 播放时间重置为 00:00
            musicImgs.removeClass('buffering').removeClass('active');  // 移除相关类名
            clearInterval(buffInterval);   // 清除定时器

            selectTrack(1);  // 添加这一句，可以实现自动播放
		}
    }

    // 定时器检测是否需要缓冲
    function checkBuffering(){
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            // 这里如果音频播放了，则nTime为当前时间毫秒数，如果没播放则为0；如果时间间隔过长，也将缓存
            if( (nTime == 0) || (bTime - nTime) > 1000  ){ 
                musicImgs.addClass('buffering');  // 添加缓存样式类
            } else{
                musicImgs.removeClass('buffering'); // 移除缓存样式类
            }
                
            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    // 点击上一首/下一首时，触发该函数。 
    //注意：后面代码初始化时，会触发一次selectTrack(0)，因此下面一些地方需要判断flag是否为0
    function selectTrack(flag){
        if( flag == 0 || flag == 1 ){  // 初始 || 点击下一首
            ++ currIndex;
            if(currIndex >=len){      // 当处于最后一首时，点击下一首，播放索引置为第一首
                currIndex = 0;
            }
        }else{                    // 点击上一首
            --currIndex;
            if(currIndex<=-1){    // 当处于第一首时，点击上一首，播放索引置为最后一首
                currIndex = len-1;
            }
        }

        if( flag == 0 ){
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放图标
        }else{
            musicImgs.removeClass('buffering');   
            playPauseBtn.attr('class','btn play-pause icon-zanting iconfont') // 显示暂停图标
        }

        seekBar.width(0);           // 重置播放进度条为0
        time.removeClass('active');
        tProgress.text('00:00');    // 播放时间重置
        totalTime.text('00:00');    // 总时间重置

        // 获取当前索引的:歌曲名，歌手名，图片，歌曲链接等信息
        if(mood==0){
        currMusic = musicNameData0[currIndex];
        currArtist = artistNameData0[currIndex];
        currImg = musicImgsData0[currIndex];
        audio.src = musicUrls0[currIndex];
        //location.reload();
        }
        else if(mood==1){
            currMusic = musicNameData1[currIndex];            
            currArtist = artistNameData1[currIndex];
            currImg = musicImgsData1[currIndex];
            audio.src = musicUrls1[currIndex];
            len=musicUrls1.length;
           }
        else if(mood==2){
            currMusic = musicNameData2[currIndex];            
            currArtist = artistNameData2[currIndex];
            currImg = musicImgsData2[currIndex];
            audio.src = musicUrls2[currIndex];
            len=musicUrls2.length;
        }
        else if(mood==3){
            currMusic = musicNameData3[currIndex];            
            currArtist = artistNameData3[currIndex];
            currImg = musicImgsData3[currIndex];
            audio.src = musicUrls3[currIndex];
            len=musicUrls3.length;
        }
        else if(mood==4){
            currMusic = musicNameData4[currIndex];            
            currArtist = artistNameData4[currIndex];
            currImg = musicImgsData4[currIndex];
            audio.src = musicUrls4[currIndex];
            len=musicUrls4.length;
        }
        else if(mood==5){
            currMusic = musicNameData5[currIndex];            
            currArtist = artistNameData5[currIndex];
            currImg = musicImgsData5[currIndex];
            audio.src = musicUrls5[currIndex];
            len=musicUrls5.length;
        }
        else if(mood==6){
            currMusic = musicNameData6[currIndex];            
            currArtist = artistNameData6[currIndex];
            currImg = musicImgsData6[currIndex];
            audio.src = musicUrls6[currIndex];
            len=musicUrls6.length;
        }
        else if(mood==7){
            currMusic = musicNameData7[currIndex];            
            currArtist = artistNameData7[currIndex];
            currImg = musicImgsData7[currIndex];
            audio.src = musicUrls7[currIndex];
            len=musicUrls7.length;
        }
        
        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();

        // 如果点击的是上一首/下一首 则设置开始播放，添加相关类名，重新开启定时器
        if(flag != 0){
            audio.play();
            playerContent1.addClass('active');
            musicImgs.addClass('active');
        
            clearInterval(buffInterval);
            checkBuffering();
        }

        // 将歌手名，歌曲名，图片链接，设置到元素上
        artistName.text(currArtist);
        musicName.text(currMusic);
        musicImgs.find('.img').css({'background':'url('+currImg+')'})
        
    }


    // 初始化函数
    function initPlayer() {
        audio = new Audio();  // 创建Audio对象

        //audio.src = musicUrls0[currIndex];
        
        selectTrack(0);       // 初始化第一首歌曲的相关信息
        

        audio.loop = false;   // 取消歌曲的循环播放功能
		
        playPauseBtn.on('click',playPause); // 点击播放/暂停 按钮，触发playPause函数
        
		// 进度条 移入/移出/点击 动作触发相应函数
		sArea.mousemove(function(event1){ showHover(event1); }); 
        sArea.mouseout(hideHover);
        sArea.on('click',playFromClickedPos);
        
        // 实时更新播放时间
        $(audio).on('timeupdate',updateCurrTime); 

        // 上下首切换
        playPrevBtn.on('click',function(){ selectTrack(-1);} );
        playNextBtn.on('click',function(){ selectTrack(1);});
    }

    // 调用初始化函数
        initPlayer();

 } );