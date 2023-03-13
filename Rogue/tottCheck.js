getComponent = () => {
  const tottId = 57933;
  const tottConfig = [
    {
      bossName: "Razorscale",
      encounterId: 746,
      targetId: 33186,
      phrase: null,
    },
    {
      bossName: "Ignis the Furnace Master",
      encounterId: 745,
      targetId: 33118,
      phrase: null,
    },
    {
      bossName: "XT-002 Deconstructor",
      encounterId: 747,
      targetId: 33293,
      phrase: null,
    },
    {
      bossName: "Algalon the Observer",
      encounterId: 757,
      targetId: 32871,
      phrase: null,
    },
    {
      bossName: "Assembly of Iron",
      encounterId: 748,
      targetId: 32857,
      phrase: null,
    },
    {
      bossName: "Kologarn",
      encounterId: 749,
      targetId: 32930,
      phrase: null,
    },
    {
      bossName: "Auriaya",
      encounterId: 750,
      targetId: 33515,
      phrase: null,
    },
    {
      bossName: "Hodir",
      encounterId: 751,
      targetId: 32845,
      phrase: null,
    },
    {
      bossName: "Thorim",
      encounterId: 752,
      targetId: 32865,
      phrase: null,
    },
    {
      bossName: "Freya",
      encounterId: 753,
      targetId: 33203,
      phrase: null,
    },
    {
      bossName: "Mimiron",
      encounterId: 754,
      targetId: 33432,
      phrase: null,
    },
    {
      bossName: "General Vezax",
      encounterId: 755,
      targetId: 33524,
      phrase: null,
    },
    {
      bossName: "Yogg-Saron",
      encounterId: 756,
      targetId: 33136,
      phrase: null,
    }
  ];

  //获取盗贼队员
  const actorRes = reportGroup.actors;
  const roguePlayerRes = actorRes.flatMap(actor => actor.subType === "Rogue" ? actor : []);
  for (let k of tottConfig) {
    for (let j of roguePlayerRes) {
      key = Object(j.name);
      k[key] = [];
    }
  }
  // return tottConfig;
  const fightsRes = reportGroup.fights;
  //return Object.keys(fightsRes[7]);
  //遍历Config数组,搜索战斗
  for (let k of tottConfig) {
    for (let j of fightsRes) {
      if (j.encounterId === k.encounterId) {
        k.fightId = fightsRes.indexOf(j);
      }
    }
  }

  //获取每场战斗的嫁祸施法事件
  for (let k of tottConfig) {


    const eventRes = fightsRes[k.fightId].events;
    const startTime = fightsRes[k.fightId].startTime;

    for (let j of eventRes) {
      if (j.type === "applybuff" && j.ability.id === tottId) {
        // return j;
        key = Object(j.source.name);
        //拼装tott施法数据
        //时间参数处理
        let buffApplyTime = j.timestamp - startTime;
        let second = parseInt(Math.round(buffApplyTime/1000));
        let minute = 0;
        if (second > 60) {
          minute = parseInt(second / 60)
          second = parseInt(second % 60)
        }

        buffApplyTime = '' + parseInt(second) + 's';
        if (minute > 0) {
          buffApplyTime = '' + parseInt(minute) + 'm' + buffApplyTime;
        }

        //获取嫁祸事件所处BOSS阶段,便于判断
        tottPhrase = fightsRes[k.fightId].phaseForEvent(j);
        tott = [
          j.source.name,
          j.target.subType,
          j.target.name,
          buffApplyTime,
          tottPhrase
          ];

        k[key].push(tott.toString());
      }
    }


  }
  return tottConfig;

}