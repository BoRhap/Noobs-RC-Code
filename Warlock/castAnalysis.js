getComponent = () => {

    const hyperSpeedId = 54758;
    const masterHealthstoneId = 47875;
    const speedId = 53908;
    const wildMagicId = 53909;
    const metamorphosisId = 47241;
    const shadowWardId = 47891;

    const castAbilityArr = [hyperSpeedId,masterHealthstoneId,speedId,wildMagicId,metamorphosisId,shadowWardId];
    const castAbilityArrWithName = [
        {abilityId:hyperSpeedId,abilityName:"hyperSpeed"},
        {abilityId:masterHealthstoneId,abilityName:"masterHealthstone"},
        {abilityId:speedId,abilityName:"speed"},
        {abilityId:wildMagicId,abilityName:"wildMagic"},
        {abilityId:metamorphosisId,abilityName:"metamorphosis"},
        {abilityId:shadowWardId,abilityName:"shadowWard"},
      ]


    //��ȡ��Ա
    const actorRes = reportGroup.actors;
    const playerRes = actorRes.flatMap(actor => actor.subType === "Warlock" && actor.type === "Player" ? actor : []);
    let actorArr = [];
    for (let k of playerRes){
        actorArr.push(k.gameId);
    }

    // return actorArr;
    //��ȡս��

    const fightsRes = reportGroup.fights;



    for (let k of fightsRes){

        const castEventRes = k.eventsByCategoryAndDisposition('casts', 'friendly').flatMap(event => actorArr.includes(event.source.gameId) && castAbilityArr.includes(event.ability.id) ? event:[]);
        if(castEventRes.length > 0){
            return castEventRes;
        }
        // return 123;
    }






    //����Config����,����ս��
    for (let k of dotConfig) {
        for (let j of fightsRes) {
            if (j.encounterId === k.encounterId) {

                k.fightId = fightsRes.indexOf(j);
            }
        }
    }

    // return dotConfig;

    for (let k of dotConfig) {
        //ʱ��ֶλ�ȡ
        // k['startTime'] = fightsRes[k.fightId].startTime;
        // k['endTime'] = fightsRes[k.fightId].endTime;
        const damageEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('damage', 'friendly').flatMap(event => event.target.gameId === k.targetId && event.source.type === "Player" ? event : []);

        if(k.phrase === null){
            //����Ҫ���ֽ׶ε�BOSSʱ��ֶλ�ȡ
            for (let j of damageEventRes) {
                if (j.targetResources != null) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.99) && (j.targetResources.maxHitPoints > k.maxHitPoints)) {
                        k["startTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.35)&& (j.targetResources.maxHitPoints > k.maxHitPoints)) {
                        k["thirtyFiveTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.25)&& (j.targetResources.maxHitPoints > k.maxHitPoints)) {
                        k["twentyFiveTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null) {
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
            //��Ҫ���ֽ׶ε�BOSSʱ��ֶλ�ȡ
            for (let j of damageEventRes) {
                if (j.targetResources != null) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.99)&& (j.targetResources.maxHitPoints > k.maxHitPoints)&& (k.phrase === fightsRes[k.fightId].phaseForEvent(j))) {
                        k["startTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.35)&& (j.targetResources.maxHitPoints > k.maxHitPoints)&& (k.phrase === fightsRes[k.fightId].phaseForEvent(j))) {
                        k["thirtyFiveTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null) {
                    if ((j.targetResources.hitPoints / j.targetResources.maxHitPoints < 0.25)&& (j.targetResources.maxHitPoints > k.maxHitPoints)&& (k.phrase === fightsRes[k.fightId].phaseForEvent(j))) {
                        k["twentyFiveTimeStamp"] = j.timestamp;
                        break;
                    }
                }
            }
            for (let j of damageEventRes) {
                if (j.targetResources != null) {
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

        const debuffEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'enemy').flatMap(event => (debuffAbilityArr.includes(event.ability.id)) && (event.target.gameId === k.targetId)? event : []);

        // return debuffEventRes;

        for (let j of debuffEventRes){
            //�ж�100-0��Ӱ����ʴ����Ӱ֮ӵ�ϵĴ���

            if(fadeCheckAbilityArr.includes(j.ability.id) && j.timestamp < (k.endTimeStamp-1000) && j.timestamp > k.startTimeStamp && j.type === "removedebuff" ){

                key = Object(j.source.name) +"-" + Object(j.ability.name)+"-fade"
                if(k[key] == null){

                    k[key] = 0;
                }
                k[key] = k[key] +1;
            }
            //�ж�100-0ʹ���޳���ʹ��������DEBUFF�Ĵ���
            if(clippedCheckAbilityArr.includes(j.ability.id) && j.timestamp < (k.endTimeStamp-1000) && j.timestamp > k.startTimeStamp && j.type === "refreshdebuff" ){

                key = Object(j.source.name) +"-" + Object(j.ability.name)+"-clipped"
                if(k[key] == null){

                    k[key] = 0;
                }
                k[key] = k[key] +1;
            }
        }

        //������
        //����100-25������

        //foreach ��ʿ
        for(let j of playerRes){
            //foreach ����
            for (let m of debuffAbilityArrWithName){
                //��ȡapply��remove�¼�
                const applyEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'enemy').flatMap(event =>(event.timestamp<k.twentyFiveTimeStamp)&& (event.source.gameId === j.gameId) &&(event.ability.id === m.abilityId) && (event.target.gameId === k.targetId) && (event.type === 'applydebuff')? event : []);
                const removeEventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('aurasGained', 'enemy').flatMap(event =>(event.timestamp<k.twentyFiveTimeStamp)&&  (event.source.gameId === j.gameId) &&(event.ability.id === m.abilityId) && (event.target.gameId === k.targetId) && (event.type === 'removedebuff')? event : []);
                //��������������û����ʼapply�������û����ֹremove���������������ż���ɶ�
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


                    sumTime = sumTime + (removeEventRes[i].timestamp-applyEventRes[i].timestamp);
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
        //�����Ӱapplydebuff���
        //foreach ��ʿ
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

        //ֻ��1�ε������ų�



    }











    return dotConfig;

}