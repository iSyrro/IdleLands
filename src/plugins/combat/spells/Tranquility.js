
import _ from 'lodash';

import { Spell, SpellType } from '../spell';

import { Tranquility as TranquilityEffect } from '../effects/Tranquility';

export class Tranquility extends Spell {
  static element = SpellType.BUFF;
  static tiers = [
    { name: 'tranquility', spellPower: 1000000, weight: 25, cost: 200, profession: 'Cleric', level: 10 }
  ];

  static shouldCast(caster) {
    return this.$canTarget.allyWithoutEffect(caster, 'Tranquility');
  }

  determineTargets() {
    return this.$targetting.all;
  }

  calcDuration() {
    return 2;
  }

  calcPotency() {
    return this.spellPower;
  }

  cast() {
    const message = '%player cast %spellName on %targetName!';
    const targets = this.determineTargets();

    _.each(targets, target => {
      super.cast({
        damage: 0,
        message,
        applyEffect: TranquilityEffect,
        targets: [target]
      });
    });
  }
}