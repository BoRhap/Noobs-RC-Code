getComponent = () => {

    const hyperSpeedId = 54758; //��������
    const masterHealthstoneId = 47875; //����ʯ
    const speedId = 53908; //����ҩˮ
    const wildMagicId = 53909;  //��Ұħ��
    const metamorphosisId = 47241; //��ħ����
    const shadowWardId = 47891;  //��ʿ��Ӱ����
    const bloodFuryId = 33702;  //���������츳
    const livingFlameId = 398475;  //����
    const scaleFatesId = 64707;  //����֮��



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


    //foreach fightsRes �ۻ�����
    for (let k of fightsRes){

        const castEventRes = k.eventsByCategoryAndDisposition('casts', 'friendly').flatMap(event => actorArr.includes(event.source.gameId) && castAbilityArr.includes(event.ability.id) ? event:[]);

        if(castEventRes.length > 0){
            return castEventRes;
        }
       
    }
    





    //ƴ�ӽ��




    return dotConfig;

}