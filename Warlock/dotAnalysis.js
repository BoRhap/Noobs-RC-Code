getComponent = () => {

    const uaId = 47843;
    const hauntId = 59164;
    const corruptionId = 47813;
    const agonyId = 47864;
    const sbId = 32391;
    const clippedCheckAbilityArr = [47843,47864]
    const fadeCheckAbilityArr = [hauntId,corruptionId,sbId]
    const debuffAbilityArr = [uaId,hauntId,corruptionId,agonyId,sbId]
    const debuffAbilityArrWithName = [
        {abilityId:uaId,abilityName:"ua",abilityCnName:"痛苦无常"},
        {abilityId:hauntId,abilityName:"haunt",abilityCnName:"鬼影缠身"},
        {abilityId:corruptionId,abilityName:"corruption",abilityCnName:"腐蚀术"},
        {abilityId:agonyId,abilityName:"agony",abilityCnName:"痛苦诅咒"},
        {abilityId:sbId,abilityName:"sb",abilityCnName:"暗影之拥"},
      ]
    const  dotConfig = [
        {
            bossName: "Razorscale",
            encounterId: 746,
            targetId: 33186,
            phrase: 2,
            maxHitPoints : 1,
        },
        {
            bossName: "Ignis the Furnace Master",
            encounterId: 745,
            targetId: 33118,
            phrase: null,
            maxHitPoints : 1,
        },
        {
            bossName: "XT-002 Deconstructor",
            encounterId: 747,
            targetId: 33293,
            phrase: null,
            maxHitPoints : 24000000,
        },

        {
            bossName: "Algalon the Observer",
            encounterId: 757,
            targetId: 32871,
            phrase: null,
            maxHitPoints : 1,
        },
        {
            bossName: "Assembly of Iron => Stormcaller Brundir",
            encounterId: 748,
            targetId: 32857,
            phrase: 1,
            maxHitPoints : 1,
        },
        {
            bossName: "Assembly of Iron => Runemaster Molgeim",
            encounterId: 748,
            targetId: 32927,
            phrase: 2,
            maxHitPoints : 1,
        },
        {
            bossName: "Assembly of Iron => Steelbreaker",
            encounterId: 748,
            targetId: 32867,
            phrase: 3,
            maxHitPoints : 1,
        },
        {
            bossName: "Kologarn",
            encounterId: 749,
            targetId: 32930,
            phrase: null,
            maxHitPoints : 1,
        },
        {
            bossName: "Kologarn => Right Arm",
            encounterId: 749,
            targetId: 32934,
            phrase: null,
            maxHitPoints : 1,
        },
        {
            bossName: "Kologarn => Left Arm",
            encounterId: 749,
            targetId: 32933,
            phrase: null,
            maxHitPoints : 1,
        },
        {
            bossName: "Auriaya",
            encounterId: 750,
            targetId: 33515,
            phrase: null,
            maxHitPoints : 1,
        },

        {
            bossName: "Thorim",
            encounterId: 752,
            targetId: 32865,
            phrase: null,
            maxHitPoints : 1,
        },


        {
            bossName: "Mimiron => Leviathan Mk II P1",
            encounterId: 754,
            targetId: 33432,
            phrase: 1,
            maxHitPoints : 1,
        },
        {
            bossName: "Mimiron => VX-001 P2",
            encounterId: 754,
            targetId: 33651,
            phrase: 3,
            maxHitPoints : 1,
        },


        {
            bossName: "Yogg-Saron",
            encounterId: 756,
            targetId: 33288,
            phrase: 3,
            maxHitPoints : 1,
        },
    ];

    //获取队员
    const actorRes = reportGroup.actors;

    const playerRes = actorRes.flatMap(actor => actor.subType === "Warlock" && actor.type === "Player" ? actor : []);
    // return playerRes;
    for (let k of dotConfig) {
        for (let j of playerRes) {
            key = Object(j.name);
            // k[key] = 0;
        }
    }



    const fightsRes = reportGroup.fights;

    //遍历Config数组,搜索战斗
    for (let k of dotConfig) {
        for (let j of fightsRes) {
            if (j.encounterId === k.encounterId) {

                k.fightId = fightsRes.indexOf(j);
            }
        }
    }

    //构造数据结构

    // return eventFilters

    for(let k of dotConfig){
        for (let j of playerRes){
            if(eventFilters.actorId === 0 || eventFilters.actorId === j.id){
                k[Object(j.name) +"-" + "ua"+"-clipped"] = 0;
                k[Object(j.name) +"-" + "agony"+"-clipped"] = 0;
                k[Object(j.name) +"-" + "haunt"+"-fade"] = 0;
                k[Object(j.name) +"-" + "corruption"+"-fade"] = 0;
                k[Object(j.name) +"-" + "sb"+"-fade"] = 0;
                k[Object(j.name) +"-" + "ua"+"-uptime"] = 0;
                k[Object(j.name) +"-" + "haunt"+"-uptime"] = 0;
                k[Object(j.name) +"-" + "corruption"+"-uptime"] = 0;
                k[Object(j.name) +"-" + "agony"+"-uptime"] = 0;
                k[Object(j.name) +"-" + "sb"+"-uptime"] = 0;
                k[Object(j.name) +"-" + "haunt"+"-avgApply"] = 0;

            }
            // for (let m of debuffAbilityArrWithName){
            //     key = Object(j.name) +"-" + Object(m.abilityName)+"-clipped"
            //     k[key] = 0;
            //     key = Object(j.name) +"-" + Object(m.abilityName)+"-fade"
            //     k[key] = 0;
            //     key = Object(j.name) +"-" + Object(m.abilityName)+"-uptime"
            //     k[key] = 0;
            //     key = Object(j.name) +"-" + Object(m.abilityName)+"-avgApply"
            //     k[key] = 0;
            // }
        }
    }

    // return dotConfig;

    for (let k of dotConfig) {
        //时间分段获取
        // k['startTime'] = fightsRes[k.fightId].startTime;
        // k['endTime'] = fightsRes[k.fightId].endTime;
        const damageEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('damage', 'friendly').flatMap(event => event.target.gameId === k.targetId && event.source.type === "Player" ? event : []);

        if(k.phrase === null){
            //不需要区分阶段的BOSS时间分段获取
            for (let j of damageEventRes) {

                if (j.targetResources != null && j.timestamp != undefined) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.99) && (j.targetResources.maxHitPoints > k.maxHitPoints)) {
                        k["startTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null && j.timestamp != undefined) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.35)&& (j.targetResources.maxHitPoints > k.maxHitPoints)) {
                        k["thirtyFiveTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes ) {
                if (j.targetResources != null && j.timestamp != undefined) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.25)&& (j.targetResources.maxHitPoints > k.maxHitPoints)) {
                        k["twentyFiveTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes ) {
                if (j.targetResources != null && j.timestamp != undefined) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.01)&& (j.targetResources.maxHitPoints > k.maxHitPoints)) {
                        k["endTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            if(k["startTimeStamp"] == null){
                k["startTimeStamp"] = fightsRes[k.fightId].startTime;
            }
            if(k["endTimeStamp"] == null){
                k["endTimeStamp"] = fightsRes[k.fightId].endTime;
            }


        }else{
            //需要区分阶段的BOSS时间分段获取
            for (let j of damageEventRes) {
                if (j.targetResources != null && j.timestamp != undefined) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.99)&& (j.targetResources.maxHitPoints > k.maxHitPoints)&& (k.phrase === fightsRes[k.fightId].phaseForEvent(j))) {
                        k["startTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null && j.timestamp != undefined) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.35)&& (j.targetResources.maxHitPoints > k.maxHitPoints)&& (k.phrase === fightsRes[k.fightId].phaseForEvent(j))) {
                        k["thirtyFiveTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null && j.timestamp != undefined) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.25)&& (j.targetResources.maxHitPoints > k.maxHitPoints)&& (k.phrase === fightsRes[k.fightId].phaseForEvent(j))) {
                        k["twentyFiveTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null && j.timestamp != undefined) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.01)&& (j.targetResources.maxHitPoints > k.maxHitPoints)&& (k.phrase === fightsRes[k.fightId].phaseForEvent(j))) {
                        k["endTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            if(k["startTimeStamp"] == null){
                k["startTimeStamp"] = fightsRes[k.fightId].startTime;
            }
            if(k["endTimeStamp"] == null){
                k["endTimeStamp"] = fightsRes[k.fightId].endTime;
            }
        }

        const debuffEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'enemy').flatMap(event => (debuffAbilityArr.includes(event.ability.id)) && (event.target.gameId === k.targetId) ? event : []);

        // return debuffEventRes;

        for (let j of debuffEventRes){

            //判断100-0鬼影、腐蚀、暗影之拥断的次数

            if(fadeCheckAbilityArr.includes(j.ability.id) && j.timestamp < (k.endTimeStamp-1000) && j.timestamp > k.startTimeStamp && j.type === "removedebuff" ){

                abilityName = debuffAbilityArrWithName.find(item => item.abilityId === j.ability.id).abilityName;

                key = Object(j.source.name) +"-" + abilityName +"-fade"
                if(k[key] == null){

                    k[key] = 0;
                }
                k[key] = k[key] +1;
            }
            //判断100-0痛苦无常、痛苦诅咒吞DEBUFF的次数
            if(clippedCheckAbilityArr.includes(j.ability.id) && j.timestamp < (k.endTimeStamp-1000) && j.timestamp > k.startTimeStamp && j.type === "refreshdebuff" ){

                abilityName = debuffAbilityArrWithName.find(item => item.abilityId === j.ability.id).abilityName;
                key = Object(j.source.name) +"-" + abilityName +"-clipped"
                if(k[key] == null){

                    k[key] = 0;
                }
                k[key] = k[key] +1;
            }
        }

        //覆盖率
        //计算100-25覆盖率

        //foreach 术士
        for(let j of playerRes){
            //foreach 技能
            for (let m of debuffAbilityArrWithName){
                //获取apply和remove事件
                const applyEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'enemy').flatMap(event =>(event.timestamp<k.twentyFiveTimeStamp)&& (event.source.gameId === j.gameId) &&(event.ability.id === m.abilityId) && (event.target.gameId === k.targetId) && (event.type === 'applydebuff')? event : []);
                const removeEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'enemy').flatMap(event =>(event.timestamp<k.twentyFiveTimeStamp)&&  (event.source.gameId === j.gameId) &&(event.ability.id === m.abilityId) && (event.target.gameId === k.targetId) && (event.type === 'removedebuff')? event : []);
                //处理特例，包括没有起始apply的情况，没有终止remove的情况，让数组变成偶数成对
                if(applyEventRes.length ===0 && removeEventRes.length === 0){
                    break;
                    key = Object(j.name) +"-" + Object(m.abilityName)+"-uptime"
                    k[key] = 0;

                }
                if(applyEventRes.length === 0){
                    applyEvent = {
                        timestamp:k.startTimeStamp
                    };
                    applyEventRes.unshift(applyEvent);
                }
                if(removeEventRes.length === 0){
                    removeEvent = {
                        timestamp:k.twentyFiveTimeStamp
                    };
                    removeEventRes.push(removeEvent);
                }

                if(applyEventRes[0].timestamp > removeEventRes[0].timestamp){
                    applyEvent = {
                        timestamp:k.startTimeStamp
                    };
                    applyEventRes.unshift(applyEvent);
                }
                if(applyEventRes[applyEventRes.length-1].timestamp > removeEventRes[removeEventRes.length-1].timestamp){
                    removeEvent = {
                        timestamp:k.twentyFiveTimeStamp
                    };
                    removeEventRes.push(removeEvent);
                }
                let sumTime = 0;

                for (i=0;i<applyEventRes.length;i++){


                    sumTime = sumTime + (removeEventRes[i]?.timestamp-applyEventRes[i]?.timestamp);
                }
                if(k.twentyFiveTimeStamp !== k.startTimeStamp){

                    let seventyFiveTime = k.twentyFiveTimeStamp-k.startTimeStamp

                    let uptimePercent = ((sumTime/(seventyFiveTime))*100).toFixed(2);
                    if(uptimePercent>100){
                        uptimePercent = 100.00
                    }
                    key = Object(j.name) +"-" + Object(m.abilityName)+"-uptime"

                    k[key] = uptimePercent;
                }



            }
        }
        //计算鬼影applydebuff间隔
        // foreach 术士
        for(let j of playerRes){
            const hauntEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'enemy').flatMap(event =>(event.source.gameId === j.gameId) &&(event.ability.id === hauntId) && (event.target.gameId === k.targetId) && ((event.type === 'applydebuff') || (event.type === 'refreshdebuff'))? event : [])
            if(hauntEventRes.length>1){
                let avgApply = 0;
                for(i=0;i<hauntEventRes.length-1;i++){

                    avgApply = avgApply+(hauntEventRes[i+1].timestamp-hauntEventRes[i].timestamp);

                }
                avgApply = ((avgApply/(hauntEventRes.length-1))/1000).toFixed(2);
                key = Object(j.name) +"-" + "haunt"+"-avgApply"
                k[key] = avgApply
            }else{

            }

        }










        //for (i=0;i<arr.length-1;i++){res.push(arr[i+1]-arr[i])}

        //只有1次的特例排除



    }











    return dotConfig;

}