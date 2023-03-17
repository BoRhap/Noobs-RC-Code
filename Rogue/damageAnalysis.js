getComponent = () => {

  const tottId = 57933;
  const snapId = 99999;
  const damageConfig = [
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
      bossName: "XT-002 Deconstructor => Heart of the Deconstructor",
      encounterId: 747,
      targetId: 33329,
      phrase: null,
    },
    {
      bossName: "Algalon the Observer",
      encounterId: 757,
      targetId: 32871,
      phrase: null,
    },
    {
      bossName: "Assembly of Iron => Stormcaller Brundir",
      encounterId: 748,
      targetId: 32857,
      phrase: 1,
    },
    {
      bossName: "Assembly of Iron => Runemaster Molgeim",
      encounterId: 748,
      targetId: 32927,
      phrase: 2,
    },
    {
      bossName: "Assembly of Iron => Steelbreaker",
      encounterId: 748,
      targetId: 32867,
      phrase: 3,
    },
    {
      bossName: "Kologarn",
      encounterId: 749,
      targetId: 32930,
      phrase: null,
    },
    {
      bossName: "Kologarn => Right Arm",
      encounterId: 749,
      targetId: 32934,
      phrase: null,
    },
    {
      bossName: "Kologarn => Left Arm",
      encounterId: 749,
      targetId: 32933,
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
      bossName: "Freya => Ancient Conservator",
      encounterId: 753,
      targetId: 33203,
      phrase: 1,
    },
    {
      bossName: "Freya => Ancient Water Spirit",
      encounterId: 753,
      targetId: 33202,
      phrase: 1,
    },
    {
      bossName: "Freya => Snaplasher",
      encounterId: 753,
      targetId: 32916,
      phrase: 1,
    },
    {
      bossName: "Freya => Storm Lasher",
      encounterId: 753,
      targetId: 32919,
      phrase: 1,
    },
    {
      bossName: "Freya => Detonating Lasher",
      encounterId: 753,
      targetId: 32918,
      phrase: 1,
    },
    {
      bossName: "Freya P1",
      encounterId: 753,
      targetId: 32906,
      phrase: 1,
    },
    {
      bossName: "Freya P2",
      encounterId: 753,
      targetId: 32906,
      phrase: 2,
    },

    {
      bossName: "Mimiron => Leviathan Mk II P1",
      encounterId: 754,
      targetId: 33432,
      phrase: 1,
    },
    {
      bossName: "Mimiron => VX-001 P2",
      encounterId: 754,
      targetId: 33651,
      phrase: 3,
    },
    {
      bossName: "Mimiron => Assault Bot",
      encounterId: 754,
      targetId: 34057,
      phrase: 5,
    },
    {
      bossName: "Mimiron => Leviathan Mk II P4",
      encounterId: 754,
      targetId: 33432,
      phrase: 6,
    },
    {
      bossName: "Mimiron => VX-001 P4",
      encounterId: 754,
      targetId: 33651,
      phrase: 6,
    },
    {
      bossName: "General Vezax => Saronite Animus",
      encounterId: 755,
      targetId: 33524,
      phrase: null,
    },
    {
      bossName: "Yogg-Saron => Guardian of Yogg-Saron",
      encounterId: 756,
      targetId: 33136,
      phrase: 1,
    },
    {
      bossName: "Yogg-Saron => Brain of Yogg-Saron",
      encounterId: 756,
      targetId: 33890,
      phrase: 2,
    },
    {
      bossName: "Yogg-Saron => Immortal Guardian",
      encounterId: 756,
      targetId: 33988,
      phrase: 3,
    },
    {
      bossName: "Yogg-Saron",
      encounterId: 756,
      targetId: 33288,
      phrase: 3,
    },
  ];

  //获取队员
  const actorRes = reportGroup.actors;

  const playerRes = actorRes.flatMap(actor => actor.subType === "Rogue" && actor.type === "Player" ? actor : []);

  for (let k of damageConfig) {
    for (let j of playerRes) {
      key = Object(j.name);
      k[key] = 0;
    }
  }



  const fightsRes = reportGroup.fights;

  //遍历Config数组,搜索战斗
  for (let k of damageConfig) {
    for (let j of fightsRes) {
      if (j.encounterId === k.encounterId) {
        k.fightId = fightsRes.indexOf(j);
      }
    }
  }
  // return damageConfig;


  for (let k of damageConfig) {

    //获取嫁祸buffApply事件数组

    const tottEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'friendly').flatMap(event => (event.ability.id === tottId) && (event.target.subType === "Rogue") && (event.type === "applybuff")? event : []);
    const endTime = fightsRes[k.fightId].endTime;
    if((tottEventRes != null)){
      var tottRes = [];
      for (let j of  tottEventRes){

        tottEvent = {
          'timestamp' : j.timestamp,
          'targetname' : j.target.name,
          'targetid' : j.target.gameId
        };

        tottRes.push(tottEvent);
      }
    }

    // return tottRes;


    //获取快照技能生效时间段数组
    const snapEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'enemy').flatMap(event => (event.ability.id === snapId) && (event.target.gameId === k.targetId)? event : []);

    // return snapEventRes;
    if (snapEventRes.length > 0){
      var snapApplyRes = [];
      for (let j of snapEventRes){
        for (let m of tottRes){
          if (j.timestamp > m.timestamp && j.timestamp < m.timestamp + 6000 && j.source.gameId === m.targetid && (j.type === "applydebuff" || j.type === "refreshdebuff")){
            snapApplyRes.push(j);
          }

        }
      }

      // return snapApplyRes;
      var snapRes = [];
      for (let j of snapApplyRes){
        snapEvent = {
          'starttime' : j.timestamp,
          'endtime' : endTime,
          'targetname' : j.target.name,
          'targetid' : j.target.gameId,
          'sourceid' : j.source.gameId,
          'sourcename' : j.source.name
        };
        for (let m of snapEventRes){
          if(m.source.gameId === j.source.gameId && m.type === "removedebuff" && m.timestamp > j.timestamp){
            snapEvent = {
              'starttime' : j.timestamp,
              'endtime' : m.timestamp,
              'targetname' : j.target.name,
              'targetid' : j.target.gameId,
              'sourceid' : j.source.gameId,
              'sourcename' : j.source.name
            };

          }
        }

        snapRes.push(snapEvent);
      }
    }




    // return  snapRes;

    //获取伤害事件
    const eventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('damage', 'friendly');


    for (let j of eventRes) {

      if (k.phrase === null) {


        if (j.target.gameId === k.targetId) {
          if (j.source.type === 'Pet') {

            key = Object(j.source.petOwner.name)
            k[key] = k[key] + j.amount;
          }
          if (j.source.type === "Player") {
            //快照技能类型计算

            if(j.ability.id === snapId){
              let tottC = 1;
              if(snapRes.length > 0){
                for (let m of snapRes) {
                  // return m;
                  if (j.timestamp > m.starttime && j.timestamp < m.endtime && j.source.gameId === m.sourceid) {

                    tottC = 1.15
                  }
                }
              }

              key = Object(j.source.name);
              k[key] = k[key] + Math.round(j.amount / tottC);
            }else{
              //普通技能类型计算
              let tottC = 1;
              if(tottRes.length > 0){
                for (let m of tottRes) {
                  // return m;
                  if (j.timestamp > m.timestamp && j.timestamp < (m.timestamp + 6000) && j.source.gameId === m.targetid) {
                    tottC = 1.15
                  }
                }
              }

              key = Object(j.source.name);
              k[key] = k[key] + Math.round(j.amount / tottC);
            }

          }
        }
      } else if (k.phrase != null) {
        if (j.target.gameId === k.targetId && fightsRes[k.fightId].phaseForEvent(j) === k.phrase) {

          if (j.source.type === 'Pet') {
            key = Object(j.source.petOwner.name)
            k[key] = k[key] + j.amount;
          }
          if (j.source.type === "Player") {
            //快照技能类型计算
            if(j.ability.id === snapId){
              let tottC = 1;
              if(snapRes.length > 0){
                for (let m of snapRes) {
                  // return m;
                  if (j.timestamp > m.starttime && j.timestamp < m.endtime && j.source.gameId === m.sourceid) {

                    tottC = 1.15
                  }
                }
              }

              key = Object(j.source.name);
              k[key] = k[key] + Math.round(j.amount / tottC);
            }else{
              //普通技能类型计算
              let tottC = 1;
              if(tottRes.length > 0){
                for (let m of tottRes) {
                  // return m;
                  if (j.timestamp > m.timestamp && j.timestamp < (m.timestamp + 6000) && j.source.gameId === m.targetid) {
                    tottC = 1.15
                  }
                }
              }

              key = Object(j.source.name);
              k[key] = k[key] + Math.round(j.amount / tottC);
            }

          }
        }
      }


    }


  }

  return damageConfig;


}