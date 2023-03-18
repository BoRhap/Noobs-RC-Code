getComponent = () => {
    const sunderArmorId = 58567;
    const sunderArmorCastId = 7386;
    const sunderArmorConfig = [
      {
        bossName: "XT-002 Deconstructor",
        encounterId: 747,
        targetId: 33293,
        phrase: null,
      },
      {
        bossName: "Mimiron => VX-001 P4",
        encounterId: 754,
        targetId: 33651,
        phrase: 6,
      },
      {
        bossName: "General Vezax",
        encounterId: 755,
        targetId: 33271,
        phrase: null,
      },
      {
        bossName: "Algalon the Observer",
        encounterId: 757,
        targetId: 32871,
        phrase: null,
    },
    ];
  
    const fightsRes = reportGroup.fights;
    //遍历Config数组,搜索战斗
    for (let k of sunderArmorConfig) {
        for (let j of fightsRes) {
            if (j.encounterId === k.encounterId) {
                k.fightId = fightsRes.indexOf(j);
            }
        }
        k["-------------------------------------"]=""
    }


    

    //获取战士队员ID
    const actorRes = reportGroup.actors;
    const playerRes = actorRes.flatMap(actor => actor.subType === "Warrior" && actor.type === "Player" ? actor : []);
    const warriorMap = new Map();
    for (let j of playerRes) {
        let w = {
            id: j.id,
            name: j.name,
            fistFiveCasts: [0,0,0,0,0],
            castCount: 0,
        }
        warriorMap.set(j.id,w)
    }

    //计算覆盖率
    for (let k of sunderArmorConfig){
        const eventRes = fightsRes[k.fightId].events;
        applyRes = eventRes.flatMap(event => (event.type === "applydebuff")? event:[]);
        removeRes = eventRes.flatMap(event => (event.type === "removedebuff")? event:[]);
        sunderArmorApplyRes = applyRes.flatMap(event => event.ability.id === sunderArmorId ? event:[]);
        sunderArmorRemoveRes = removeRes.flatMap(event => event.ability.id === sunderArmorId ? event:[]);
        const startTime = fightsRes[k.fightId].startTime;
        const endTime = fightsRes[k.fightId].endTime;
        const combatTime = endTime-startTime;
        let sunderArmorSumTime = 0;
        applyLength = sunderArmorApplyRes.length;
        removeLength = sunderArmorRemoveRes.length;
        if(applyLength > removeLength){
            sunderArmorRemoveRes[applyLength - 1] = {
                timestamp : endTime,
            };

        }
        for (i=0;i<applyLength;i++){
            sunderArmorSumTime = sunderArmorSumTime + (sunderArmorRemoveRes[i].timestamp-sunderArmorApplyRes[i].timestamp);
        }
        let sunderArmorPercent = ((sunderArmorSumTime/combatTime)*100).toFixed(2);
        key = Object(sunderArmorApplyRes[0].source.name);
        k[key] = {
            coverage: sunderArmorPercent,
        }
    }

    //起手5CAST
    for (let k of sunderArmorConfig){
        const eventRes = fightsRes[k.fightId].events; 
        // 每场战斗重置castCount，firstDamageTimestamp，totalCastCount 为0
        for (let [,w] of warriorMap) {
            w.castCount = 0
        }
        let firstDamageTimestamp = 0;
        let totalCastCount = 0;
        for (let j of eventRes){
            if ((firstDamageTimestamp === 0) && (j.type === "damage") && (j.target.gameId === k.targetId) && (j.source.subType != "Shaman")) {
                if (k.phrase === null || fightsRes[k.fightId].phaseForEvent(j) === k.phrase) {
                  firstDamageTimestamp = j.timestamp;
                  continue;
                } 
              }
            if(j.type === "cast" && j.ability.id===sunderArmorCastId){
                let warrior = warriorMap.get(j.source.id);
                totalCastCount++;
                warrior.fistFiveCasts[warrior.castCount]=j.timestamp - firstDamageTimestamp;
                warrior.castCount++;
                if(totalCastCount === 5){
                    break;
                }
           }
        }
        // 直接赋值是引用传递，要自己遍历数组做值传递
        for (let [,w] of warriorMap) {
            let tmpFistFiveCasts = [0,0,0,0,0];
            for (i=0;i<5;i++) {
                tmpFistFiveCasts[i]=w.fistFiveCasts[i];
            }
            k[w.name]["first 5 casts"]=tmpFistFiveCasts;
        }
    }
    return sunderArmorConfig;


}