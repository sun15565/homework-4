// 增强版异步寻宝游戏 - 包含多种情节和挑战
class EnhancedTreasureMap {
  constructor() {
    this.health = 100;
    this.energy = 100;
    this.inventory = [];
    this.companions = [];
    this.currentLocation = 'library';
  }

  // 工具方法
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static randomChance(probability) {
    return Math.random() < probability;
  }

  // 1. 获取初始线索
  static async getInitialClue() {
    await this.sleep(800);
    return {
      message: "在古老的图书馆里找到了第一个线索...",
      clue: "寻找三颗宝石：红宝石在火焰中，蓝宝石在深水中，绿宝石在森林中",
      location: "library"
    };
  }

  // 2. 解码古代文字
  static async decodeAncientScript(clue) {
    await this.sleep(1200);
    if (!clue) {
      throw new Error("没有线索可以解码!");
    }
    return {
      message: "解码成功!宝藏在一座古老的神庙中...",
      decodedInfo: "神庙位于迷雾森林深处，需要三颗宝石才能开启",
      location: "decoded"
    };
  }

  // 3. 寻找同伴
  static async findCompanions() {
    await this.sleep(1000);
    const companions = [];
    const companionTypes = ['战士', '法师', '盗贼', '治疗师'];
    
    // 随机获得1-2个同伴
    const numCompanions = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < numCompanions; i++) {
      companions.push(companionTypes[Math.floor(Math.random() * companionTypes.length)]);
    }
    
    return {
      message: `找到了${companions.length}个同伴: ${companions.join(', ')}`,
      companions: companions,
      location: "village"
    };
  }

  // 4. 收集宝石任务
  static async collectGems() {
    await this.sleep(1500);
    const gems = [];
    const gemLocations = [
      { name: '红宝石', location: '火山', difficulty: 0.7 },
      { name: '蓝宝石', location: '深海', difficulty: 0.6 },
      { name: '绿宝石', location: '森林', difficulty: 0.5 }
    ];

    for (const gem of gemLocations) {
      await this.sleep(800);
      if (this.randomChance(gem.difficulty)) {
        gems.push(gem.name);
        console.log(`成功获得${gem.name}！`);
      } else {
        console.log(`在${gem.location}寻找${gem.name}时遇到了困难...`);
      }
    }

    if (gems.length < 3) {
      throw new Error(`只收集到${gems.length}颗宝石，需要3颗才能继续！`);
    }

    return {
      message: `成功收集到所有宝石: ${gems.join(', ')}`,
      gems: gems,
      location: "gems_collected"
    };
  }

  // 5. 天气检查
  static async checkWeather() {
    await this.sleep(600);
    const weatherConditions = ['晴朗', '多云', '小雨', '暴雨', '大雾'];
    const weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    let effect = "";
    switch(weather) {
      case '暴雨':
        effect = "暴雨影响行动，需要等待天气好转";
        await this.sleep(2000);
        break;
      case '大雾':
        effect = "大雾影响视线，增加了迷路的可能性";
        break;
      case '晴朗':
        effect = "天气晴朗，是行动的好时机";
        break;
    }

    return {
      message: `当前天气: ${weather}. ${effect}`,
      weather: weather,
      effect: effect,
      location: "weather_check"
    };
  }

  // 6. 前往神庙
  static async approachTemple() {
    await this.sleep(2000);
    
    // 随机事件
    const events = [
      { message: "顺利到达神庙入口", success: true },
      { message: "遇到了森林守护者，需要战斗", success: this.randomChance(0.6) },
      { message: "发现了古老的陷阱，需要小心避开", success: this.randomChance(0.8) },
      { message: "迷路了，需要重新寻找路径", success: this.randomChance(0.7) }
    ];

    const event = events[Math.floor(Math.random() * events.length)];
    
    if (!event.success) {
      throw new Error(event.message + " - 行动失败！");
    }

    return {
      message: event.message + " - 成功！",
      location: "temple_entrance"
    };
  }

  // 7. 神庙守卫战斗
  static async faceTempleGuard() {
    await this.sleep(1500);
    
    if (this.randomChance(0.4)) {
      throw new Error("遇到了强大的神庙守卫！需要撤退重新制定策略");
    }

    return {
      message: "成功避开或击败了神庙守卫！",
      location: "temple_interior"
    };
  }

  // 8. 解谜挑战
  static async solvePuzzle() {
    await this.sleep(1800);
    
    const puzzles = [
      {
        question: "古代文字谜题：'太阳升起的地方'",
        answer: "东",
        hint: "想想太阳每天从哪里升起"
      },
      {
        question: "数字谜题：2, 4, 8, 16, ?",
        answer: "32",
        hint: "每个数字都是前一个的2倍"
      },
      {
        question: "图案谜题：找出规律 ○●○●○?",
        answer: "●",
        hint: "黑白交替的规律"
      }
    ];

    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    console.log(`谜题: ${puzzle.question}`);
    console.log(`提示: ${puzzle.hint}`);

    // 模拟解谜过程
    if (this.randomChance(0.7)) {
      return {
        message: `成功解开谜题！答案是: ${puzzle.answer}`,
        puzzle: puzzle,
        location: "puzzle_solved"
      };
    } else {
      throw new Error(`谜题太难了！答案是: ${puzzle.answer}，需要重新尝试`);
    }
  }

  // 9. 开启宝箱
  static async openTreasureBox() {
    await this.sleep(1200);
    
    if (this.randomChance(0.15)) {
      throw new Error("宝箱被诅咒了！需要找到解除诅咒的方法");
    }

    const treasures = [
      "古老的魔法卷轴",
      "价值连城的黄金",
      "神秘的魔法宝石",
      "失传的武功秘籍",
      "传说中的神器"
    ];

    const treasure = treasures[Math.floor(Math.random() * treasures.length)];

    return {
      message: `恭喜！你找到了传说中的宝藏: ${treasure}！`,
      treasure: treasure,
      location: "treasure_found"
    };
  }

  // 10. 支线任务：治疗和恢复
  static async healingQuest() {
    await this.sleep(1000);
    return {
      message: "找到了治疗泉水，恢复了体力和魔法值！",
      health: 100,
      energy: 100,
      location: "healing_spring"
    };
  }
}

// 使用 async/await 重写的主寻宝流程
async function findTreasureWithAsyncAwait() {
  const game = new EnhancedTreasureMap();
  
  try {
    console.log("=== 开始寻宝冒险 ===");
    
    // 1. 获取初始线索
    console.log("\n📚 第一步：寻找线索");
    const clue = await EnhancedTreasureMap.getInitialClue();
    console.log(clue.message);
    console.log(`线索内容: ${clue.clue}`);

    // 2. 解码古代文字
    console.log("\n🔍 第二步：解码古代文字");
    const decoded = await EnhancedTreasureMap.decodeAncientScript(clue.clue);
    console.log(decoded.message);
    console.log(`解码信息: ${decoded.decodedInfo}`);

    // 3. 寻找同伴
    console.log("\n👥 第三步：寻找同伴");
    const companions = await EnhancedTreasureMap.findCompanions();
    console.log(companions.message);

    // 4. 并发执行：收集宝石和检查天气
    console.log("\n💎 第四步：收集宝石和检查天气");
    const [gemsResult, weatherResult] = await Promise.allSettled([
      EnhancedTreasureMap.collectGems(),
      EnhancedTreasureMap.checkWeather()
    ]);

    if (gemsResult.status === 'fulfilled') {
      console.log(gemsResult.value.message);
    } else {
      console.log("宝石收集失败:", gemsResult.reason.message);
      throw gemsResult.reason;
    }

    if (weatherResult.status === 'fulfilled') {
      console.log(weatherResult.value.message);
    } else {
      console.log("天气检查失败:", weatherResult.reason.message);
    }

    // 5. 前往神庙
    console.log("\n🏛️ 第五步：前往神庙");
    const temple = await EnhancedTreasureMap.approachTemple();
    console.log(temple.message);

    // 6. 处理神庙守卫
    console.log("\n⚔️ 第六步：面对神庙守卫");
    try {
      const guard = await EnhancedTreasureMap.faceTempleGuard();
      console.log(guard.message);
    } catch (error) {
      console.log(error.message);
      console.log("执行支线任务：寻找治疗泉水...");
      const healing = await EnhancedTreasureMap.healingQuest();
      console.log(healing.message);
      
      // 重新尝试面对守卫
      console.log("重新挑战神庙守卫...");
      const guardRetry = await EnhancedTreasureMap.faceTempleGuard();
      console.log(guardRetry.message);
    }

    // 7. 解谜挑战
    console.log("\n🧩 第七步：解谜挑战");
    try {
      const puzzle = await EnhancedTreasureMap.solvePuzzle();
      console.log(puzzle.message);
    } catch (error) {
      console.log(error.message);
      console.log("重新尝试解谜...");
      const puzzleRetry = await EnhancedTreasureMap.solvePuzzle();
      console.log(puzzleRetry.message);
    }

    // 8. 开启宝箱
    console.log("\n📦 第八步：开启宝箱");
    try {
      const treasure = await EnhancedTreasureMap.openTreasureBox();
      console.log(treasure.message);
    } catch (error) {
      console.log(error.message);
      console.log("寻找解除诅咒的方法...");
      await EnhancedTreasureMap.sleep(1000);
      console.log("诅咒解除！重新尝试开启宝箱...");
      const treasureRetry = await EnhancedTreasureMap.openTreasureBox();
      console.log(treasureRetry.message);
    }

    console.log("\n🎉 寻宝冒险成功完成！");
    console.log("=== 冒险结束 ===");

  } catch (error) {
    console.error("\n❌ 寻宝失败:", error.message);
    console.log("=== 冒险结束 ===");
  }
}

// 启动寻宝游戏
findTreasureWithAsyncAwait();