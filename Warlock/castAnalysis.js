getComponent = () => {

    const hyperSpeedId = 54758; //加速手套
    const masterHealthstoneId = 47875; //治疗石
    const speedId = 53908; //加速药水
    const wildMagicId = 53909;  //狂野魔法
    const metamorphosisId = 47241; //恶魔变身
    const shadowWardId = 47891;  //术士暗影吸收
    const bloodFuryId = 33702;  //兽人种族天赋
    const livingFlameId = 398475;  //活焰
    const scaleFatesId = 64707;  //命运之鳞



    const castAbilityArr = [hyperSpeedId,masterHealthstoneId,speedId,wildMagicId,metamorphosisId,shadowWardId];
    const castAbilityArrWithName = [
        {abilityId:hyperSpeedId,abilityName:"hyperSpeed"},
        {abilityId:masterHealthstoneId,abilityName:"masterHealthstone"},
        {abilityId:speedId,abilityName:"speed"},
        {abilityId:wildMagicId,abilityName:"wildMagic"},
        {abilityId:metamorphosisId,abilityName:"metamorphosis"},
        {abilityId:shadowWardId,abilityName:"shadowWard"},
        {abilityId:bloodFuryId,abilityName:"bloodFury"},
        {abilityId:livingFlameId,abilityName:"livingFlame"},
        {abilityId:scaleFatesId,abilityName:"scaleFates"},
      ]


    //获取队员
    const actorRes = reportGroup.actors;
    const playerRes = actorRes.flatMap(actor => actor.subType === "Warlock" && actor.type === "Player" ? actor : []);
    let actorArr = [];
    for (let k of playerRes){
        actorArr.push(k.gameId);
    }

    // return actorArr;
    //获取战斗

    const fightsRes = reportGroup.fights;


    //foreach fightsRes 累积数据
    for (let k of fightsRes){

        const castEventRes = k.eventsByCategoryAndDisposition('casts', 'friendly').flatMap(event => actorArr.includes(event.source.gameId) && castAbilityArr.includes(event.ability.id) ? event:[]);

        if(castEventRes.length > 0){
            return castEventRes;
        }
       
    }
    





    //拼接结果




    return dotConfig;

}