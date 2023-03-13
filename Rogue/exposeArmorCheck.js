getComponent = () => {

  const exposeArmorId = 8647;
  const exposeArmorConfig = [
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
      bossName: "Mimiron  => Leviathan Mk II P1",
      encounterId: 754,
      targetId: 33432,
      phrase: 1,
    },
    {
      bossName: "Mimiron  => VX-001 P2",
      encounterId: 754,
      targetId: 33651,
      phrase: 3,
    },
    {
      bossName: "Mimiron  => Leviathan Mk II P4",
      encounterId: 754,
      targetId: 33432,
      phrase: 6,
    },
    {
      bossName: "General Vezax  => Saronite Animus",
      encounterId: 755,
      targetId: 33524,
      phrase: null,
    },
    {
      bossName: "Yogg-Saron  => Brain of Yogg-Saron",
      encounterId: 756,
      targetId: 33890,
      phrase: 2,
    },
    {
      bossName: "Yogg-Saron",
      encounterId: 756,
      targetId: 33288,
      phrase: 3,
    },
  ];

  //遍历Config数组,搜索战斗
  const fightsRes = reportGroup.fights;
  for (let k of exposeArmorConfig) {
    for (let j of fightsRes) {
      if (j.encounterId === k.encounterId) {
        k.fightId = fightsRes.indexOf(j);
      }
    }
  }

  //继续遍历config数组,获取每场战斗的破甲apply事件
  for (let k of exposeArmorConfig) {
    const eventRes = reportGroup.fights[k.fightId].events;

    for (let j of eventRes) {

      if ((j.type === "applydebuff") && (j.ability.id === exposeArmorId) && (j.target.gameId === k.targetId)) {
        // return j;
        if (k.phrase === null) {
          k.debuffApplyTime = j.timestamp;
          break;
        } else if (fightsRes[k.fightId].phaseForEvent(j) === k.phrase) {
          k.debuffApplyTime = j.timestamp;
          break;
        }


      }
    }
    for (let j of eventRes) {
      //return fightsRes[k.fightId].phaseForEvent(j)
      if ((j.type === "damage") && (j.target.gameId === k.targetId) && (j.source.subType != "Shaman")) {
        if (k.phrase === null) {
          k.firstDamageTimestamp = j.timestamp;
          k.exposeArmorTime = k.debuffApplyTime - k.firstDamageTimestamp;
          break;
        } else if (fightsRes[k.fightId].phaseForEvent(j) === k.phrase) {
          k.firstDamageTimestamp = j.timestamp;
          k.exposeArmorTime = k.debuffApplyTime - k.firstDamageTimestamp;
          break;
        }
      }
    }
  }

  return exposeArmorConfig;


}