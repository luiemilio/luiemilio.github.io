const ITEMS = [
    { name: 'Staff or Wand', description: 'Once a day it doubles the distance, area, size, or effect of a spell you cast.' },
    { name: 'Skate Key', description: ' Once a day you can fine-tune your board and receive +1 Health.' },
    { name: 'Smoking Pipe', description: 'Puffing the sacred smoke prior to a roll provides Advantage once per day.' },
    { name: 'Shield', description: 'Provides +1 Defense when held. PCs may choose to have it shatter in combat to ignore all damage.' },
    { name: 'Melee Weapon', description: 'Adds +1 Damage but not to Attack Rolls (i.e. a knife, sword or mace).' },
    { name: 'Ranged Weapon', description: 'Adds +1 Damage but not to Attack Rolls (i.e. a bow or crossbow).' },
    { name: 'Lore from Yore', description: 'Retrieved from under a mattress, this stack of old skate mags contain articles and tidbits about various cultures and bygone days.' },
    { name: 'Lockpicking Tools', description: 'Used by many Skate Wizards to get into the archmage\'s secret stash.' },
    { name: 'Oil Flask', description: 'Viscous lubricant, flammable, and tastes great on salads.' },
    { name: 'Rope', description: 'Made of hemp, obvi.' },
    { name: 'Torch & Tinder', description: 'A beautiful monogrammed matching set received on your last birthday.' },
    { name: 'Ball Bearings', description: 'A pouchful taken from the prototype of a new mega skate wheel design you’ve been messing with.' }
];

const BOOTLEG_SPELLS = [
    { name: 'Mattress', description: 'Create a magical cushiony king-sized mattress that minimizes the impact of a fall from three stories or less.' },
    { name: 'Wannabe', description: 'Disguise yourself as any creature of your relative dimensions.' },
    { name: 'Trailblaze', description: 'Leave a trail of fire in your skate-board\'s wake for a full minute.' },
    { name: 'Sweet Jamz', description: 'Create great music that fills the air. All non-Skate Wizards in the vicinity have Disadvantage for five minutes.' },
    { name: 'High Times', description: 'Transform your skateboard into a cloud you can ride up to two stories above the ground. It lasts five minutes and does not impact movement or speed.' },
    { name: 'Gleam the Cube', description: 'Defy gravity with your board for five minutes, allowing you to skate on walls and ceilings.' },
];

const RANDO_SPELLS = [
    ['Awesome', 'Busted', 'Dope', 'Epic', 'Gnarly', 'Hyped', 'Janky', 'Killer', 'Psyched', 'Rad', 'Sketchy', 'Stoked'],
    ['Animating', 'Attracting', 'Bewildering', 'Concealing', 'Consuming', 'Crushing', 'Duplicating', 'Expanding', 'Revealing', 'Sealing', 'Shielding', 'Summoning'],
    ['Acid', 'Air', 'Dust', 'Earth', 'Fire', 'Light', 'Reflection', 'Shadow', 'Smoke', 'Sound', 'Spirit', 'Water'],
    ['Armor', 'Boot', 'Bread', 'Bucket', 'Chain', 'Door', 'Hammer', 'Lute', 'Mattress', 'Tower', 'Tree', 'Well']
];

const PERMANENT_SPELLS = [
    { name: 'Ramp', description: 'A magical ramp about the size of a park bench appears below your skateboard.' },
    { name: 'Sidewalk', description: 'A magical sidewalk appears directly below your board.' },
    { name: 'Rail', description: 'A magical rail about as long and tall as a picnic table appears below your skateboard.' }
];

const getDice = (d) => {
    return Array.from({ length: d }, (_, i) => i + 1);
};

const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const roll = (n, d) => {
    const dice = getDice(d);
    const rolls = [];
    let sum = 0;

    for (let i = 0; i < n; i++) {
        rolls.push(getRandomElement(dice));
    }

    rolls.forEach(roll => sum += roll);

    return {
        rolls,
        sum
    }
};

const getAbilities = () => {
    const abilityScores = [
        [2, 1, 0],
        [2, 0, 1],
        [1, 2, 0],
        [0, 2, 1],
        [1, 0, 2],
        [0, 1, 2]
    ]

    const abilities = getRandomElement(abilityScores);

    return {
        'Strength': abilities[0],
        'Dexterity': abilities[1],
        'Will': abilities[2]
    }
};

const getItems = () => {
    const selectedItems = [];

    while (selectedItems.length < 3) {
        const rolledItem = getRandomElement(ITEMS);

        if (!selectedItems.some(selectedItem => selectedItem.name === rolledItem.name)) {
            selectedItems.push(rolledItem);
        }
    }

    return selectedItems;
};

const clearDiv = (divId) => {
    const div = divId = document.querySelector(`#${divId}`);

    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
};

const clearDivs = () => {
    ['sections', 'stats-bar'].forEach(clearDiv);
}

const createDiv = (section, id, header) => {
    let sectionEl = document.querySelector(`#${section}`);

    if (!sectionEl) {
        const sectionsDiv = document.querySelector('#sections');
        sectionEl = document.createElement('div');
        sectionEl.id = section;
        sectionsDiv.appendChild(sectionEl);
    }

    const divEl = document.createElement('div');
    const headerEl = document.createElement('h2');

    divEl.id = id;
    headerEl.innerHTML = header;
    divEl.appendChild(headerEl);
    sectionEl.appendChild(divEl);
    divEl.className = 'info-div';

    return divEl;
};

const createUl = (sectionEl) => {
    const ul = document.createElement('ul');
    sectionEl.appendChild(ul);

    return ul;
}

const createLi = (ul, key, value) => {
    const li = document.createElement('li');
    const nameSpan = document.createElement('span');
    const descriptionSpan = document.createElement('span');
    nameSpan.innerHTML = key;
    nameSpan.className = 'key-span';
    descriptionSpan.innerHTML = value;
    descriptionSpan.className = 'value-span';
    li.appendChild(nameSpan);
    li.appendChild(descriptionSpan);
    ul.appendChild(li);
};

const populateAbilities = () => {
    const abilitiesDiv = createDiv('sections', 'ability-scores', 'Abilities');
    const ul = createUl(abilitiesDiv);
    const abilities = getAbilities();

    Object.entries(abilities).forEach(([ability, score]) => {
        createLi(ul, ability, score);
    });

};

const populatePermSpells = () => {
    const permSpellsDiv = createDiv('sections', 'perm-spells', 'Permanent Spells');
    const ul = createUl(permSpellsDiv);

    PERMANENT_SPELLS.forEach(({ description, name }) => {
        createLi(ul, name, description);
    });
};

const populateItems = () => {
    const itemsDiv = createDiv('sections', 'items', 'Items');
    const ul = createUl(itemsDiv);
    const items = getItems();

    items.forEach((item) => {
        const { name, description } = item;
        createLi(ul, name, description);
    });
};

const populateRandoSpell = () => {
    const randoSpellDiv = createDiv('sections', 'rando-spell', 'Rando Spell');
    const ul = createUl(randoSpellDiv);

    const randoSpell = RANDO_SPELLS.map(wordList => getRandomElement(wordList)).join(' ');

    createLi(ul, randoSpell, null);
};

const populateBootlegSpell = () => {
    const randoSpellDiv = createDiv('sections', 'bootleg-spell', 'Bootleg Spell');
    const ul = createUl(randoSpellDiv);

    const { name, description } = getRandomElement(BOOTLEG_SPELLS);

    createLi(ul, name, description);
};

populateInfoBar = () => {
    const infoBarDiv = document.querySelector('#stats-bar');
    const ul = createUl(infoBarDiv);
    
    const startingStats = {
        'HP': 4,
        'Defense': 6,
        'Attack Bonus': 0
    };
    
    Object.entries(startingStats).forEach(([stat, value]) => {
        createLi(ul, stat, value);
    });
};

const isOnTop = (div1, div2) => {
    return Math.floor(div1.getBoundingClientRect().bottom) <= Math.floor(div2.getBoundingClientRect().top);
};

const isToTheLeft = (div1, div2) => {
    return Math.floor(div1.getBoundingClientRect().right) <= Math.floor(div2.getBoundingClientRect().left);
};

const setBorders = () => {
    const divs = ['ability-scores', 'perm-spells', 'items', 'rando-spell', 'bootleg-spell'].map(id => document.querySelector(`#${id}`));

    divs.forEach((div) => {
        const otherDivs = divs.filter(divEl => divEl.id !== div.id);
        div.classList.remove('bottom-border');
        div.classList.remove('right-border');

        if (otherDivs.some(otherDiv => isOnTop(div, otherDiv))) {
            div.classList.add('bottom-border');
        }

        if (otherDivs.some(otherDiv => isToTheLeft(div, otherDiv))) {
            div.classList.add('right-border');
        }
    });
};

const populate = () => {
    clearDivs();
    populateInfoBar();
    populateAbilities();
    populatePermSpells();
    populateItems();
    populateRandoSpell();
    populateBootlegSpell();
    setBorders();
};

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', () => {
        setBorders();
    });

    const bailOutBtn = document.querySelector('#roll-btn');

    bailOutBtn.addEventListener('click', () => {
        populate();
    });

    populate();
});