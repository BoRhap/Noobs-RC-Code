getComponent = () => {
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
      bossName: "Mimiron => VX-001",
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

  //获取盗贼队员
  const actorRes = reportGroup.actors;
  const roguePlayerRes = actorRes.flatMap(actor => actor.subType === "Rogue" ? actor : []);
  for (let k of damageConfig) {
    for (let j of roguePlayerRes) {
      key = Object(j.name);
      k[key] = 0;
    }
  }

  // return damageConfig;
  const fightsRes = reportGroup.fights;

  //遍历Config数组,搜索战斗
  for (let k of damageConfig) {
    for (let j of fightsRes) {
      if (j.encounterId === k.encounterId) {
        k.fightId = fightsRes.indexOf(j);
      }
    }
  }

  //获取每场战斗的伤害事件
  for (let k of damageConfig) {
    const eventRes = fightsRes[k.fightId].eventsByCategoryAndDisposition('damage', 'friendly');

    for (let j of eventRes) {

      if (k.phrase === null) {
        if (j.target.gameId === k.targetId) {
          key = Object(j.source.name);
          k[key] = k[key] + j.amount;

        }
      } else if (k.phrase != null) {
        if (j.target.gameId === k.targetId && fightsRes[k.fightId].phaseForEvent(j) === k.phrase) {
          key = Object(j.source.name);
          k[key] = k[key] + j.amount;

        }
      }


    }


  }
  return damageConfig;

}