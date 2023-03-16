getComponent = () => {

    const insectSwarmId = 48468;
    const insectSwarConfig = [
        {
            bossName: "Algalon the Observer",
            encounterId: 757,
            targetId: 32871,
            phrase: null,
        },
    ];

    const fightsRes = reportGroup.fights;
    //遍历Config数组,搜索战斗
    for (let k of insectSwarConfig) {
        for (let j of fightsRes) {
            if (j.encounterId === k.encounterId) {
                k.fightId = fightsRes.indexOf(j);
            }
        }
    }


    //获取平衡德队员ID

    for (let k of insectSwarConfig) {
        const balancePlayerRes = fightsRes[k.fightId].combatantInfoEvents.flatMap(combatantInfo => combatantInfo.source.subType === 'Druid' ? combatantInfo : []);
        // return balancePlayerRes
        for (let j of balancePlayerRes) {

            if (j.talentPoints[0] > j.talentPoints[2]) {
                key = Object(j.source.name);
                k[key] = 0;
            }

        }
    }

    //计算覆盖率
    for (let k of insectSwarConfig){
        const eventRes = fightsRes[k.fightId].events;
        applyRes = eventRes.flatMap(event => (event.type === "applydebuff")? event:[]);
        removeRes = eventRes.flatMap(event => (event.type === "removedebuff")? event:[]);
        // return buffRes;
        insectSwarmApplyRes = applyRes.flatMap(event => event.ability.id === insectSwarmId ? event:[]);
        insectSwarmRemoveRes = removeRes.flatMap(event => event.ability.id === insectSwarmId ? event:[]);
        const startTime = fightsRes[k.fightId].startTime;
        const endTime = fightsRes[k.fightId].endTime;
        const combatTime = endTime-startTime;

        let insectSwarmSumTime = 0;
        applyLength = insectSwarmApplyRes.length;
        removeLength = insectSwarmRemoveRes.length;

        if(applyLength > removeLength){
            insectSwarmRemoveRes[applyLength - 1] = {
                timestamp : endTime,
            };

        }


        for (i=0;i<applyLength;i++){

            insectSwarmSumTime = insectSwarmSumTime + (insectSwarmRemoveRes[i].timestamp-insectSwarmApplyRes[i].timestamp);
        }

        let insectSwarmPercent = ((insectSwarmSumTime/combatTime)*100).toFixed(2);
        key = Object(insectSwarmApplyRes[0].source.name);
        k[key] = insectSwarmPercent;

    }

    return insectSwarConfig;


}