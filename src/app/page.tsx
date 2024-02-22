'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './page.module.scss';
import { LineParseTextarea } from '@/components/LineParseTextarea';
import { Icon } from '@iconify/react';
import { CopiedToast } from '@/components/CopiedToast';
import { AutocompleteInput } from '@/components/AutocompleteInput';

export default function Home() {
  const [cubeList, setCubeList] = useState<string[]>(list);
  const [removedCards, setRemovedCards] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [removeType, setRemoveType] = useState('select');
  const removeCardsTextareaRef = useRef<HTMLTextAreaElement>(null);

  const remainingCards = useMemo(() => {
    const cubeSet = new Set(cubeList);
    removedCards.forEach((card) => cubeSet.delete(card));
    return Array.from(cubeSet);
  }, [cubeList, removedCards]);

  useEffect(() => {
    if (removeType === 'paste' && removeCardsTextareaRef.current)
      removeCardsTextareaRef.current.value = removedCards.join('\n');
  }, [removeType]);

  const selectItems = useMemo(() => {
    const set = new Set(cubeList);
    removedCards.forEach((removed) => set.delete(removed));
    return Array.from(set);
  }, [cubeList, removedCards]);

  return (
    <main className={styles.main}>
      <section>
        <section className={styles.header}>
          <h2>Cube List</h2>

          <p className={styles.count}>{cubeList.length} cards</p>
        </section>

        <LineParseTextarea
          onLinesParsed={setCubeList}
          value={list.join('\n')}
        />
      </section>

      <section>
        <section className={styles.header}>
          <h2>Removed Cards</h2>

          <select
            onChange={({ currentTarget: { value } }) => setRemoveType(value)}
          >
            <option value='select'>Select from Cube</option>
            <option value='paste'>Paste</option>
          </select>

          <p className={styles.count}>{removedCards.length} cards</p>
        </section>

        {removeType === 'select' && (
          <div className={styles.removed}>
            <AutocompleteInput
              items={selectItems}
              onSelect={(selected) =>
                setRemovedCards((cur) => [...cur, selected])
              }
            />

            {removedCards.map((removed) => (
              <div className={styles.removedCard} key={removed}>
                <Icon
                  icon='material-symbols:delete-outline'
                  onClick={() =>
                    setRemovedCards((cur) => cur.filter((r) => r !== removed))
                  }
                />

                <span>{removed}</span>
              </div>
            ))}
          </div>
        )}

        {removeType === 'paste' && (
          <LineParseTextarea
            onLinesParsed={setRemovedCards}
            ref={removeCardsTextareaRef}
          />
        )}
      </section>

      <section>
        <section className={styles.header}>
          <h2>Remaining Cards</h2>

          <Icon
            icon='material-symbols:content-copy-outline'
            onClick={() => {
              navigator.clipboard.writeText(remainingCards.join('\n'));
              setShowToast(true);
            }}
            width={30}
          />

          <p className={styles.count}>{remainingCards.length} cards</p>
        </section>

        <section className={styles.remaining}>
          {remainingCards.map((card) => (
            <div key={card}>{card}</div>
          ))}
        </section>
      </section>

      <CopiedToast hide={() => setShowToast(false)} show={showToast} />
    </main>
  );
}
const list = [
  'Giver of Runes',
  'Mother of Runes',
  'Adanto Vanguard',
  'Kor Firewalker',
  'Stoneforge Mystic',
  'Thalia, Guardian of Thraben',
  'Wall of Omens',
  'Blade Splicer',
  'Flickerwisp',
  'Monastery Mentor',
  'Porcelain Legionnaire',
  'Silverblade Paladin',
  'Skyclave Apparition',
  'Hero of Bladehold',
  'Palace Jailer',
  'Restoration Angel',
  'Angel of Sanctions',
  'Cloudgoat Ranger',
  'Reveillark',
  'Solitude',
  'Elesh Norn, Grand Cenobite',
  'Gideon of the Trials',
  'Elspeth, Knight-Errant',
  'Gideon Jura',
  'Enlightened Tutor',
  'Path to Exile',
  'Swords to Plowshares',
  'Unexpectedly Absent',
  'Gather the Townsfolk',
  "Council's Judgment",
  'Timely Reinforcements',
  'Day of Judgment',
  'Hallowed Burial',
  'Terminus',
  'Approach of the Second Sun',
  'Mox Pearl',
  'Journey to Nowhere',
  'Oblivion Ring',
  "Faith's Fetters",
  'Elspeth Conquers Death',
  'Looter il-Kor',
  'Phantasmal Image',
  'Snapcaster Mage',
  'Thieving Skydiver',
  'Brazen Borrower',
  'Champion of Wits',
  'Chrome Host Seedshark',
  'Emry, Lurker of the Loch',
  'Hullbreacher',
  'Nimble Obstructionist',
  'Spellseeker',
  'Vendilion Clique',
  'Glen Elendra Archmage',
  'Phyrexian Metamorph',
  'Subtlety',
  'Urza, Lord High Artificer',
  'Meloku the Clouded Mirror',
  'Mulldrifter',
  'Consecrated Sphinx',
  'Frost Titan',
  'Torrential Gearhulk',
  'Jace Beleren',
  'Narset, Parter of Veils',
  'Jace, the Mind Sculptor',
  'Tamiyo, the Moon Sage',
  'Ancestral Recall',
  'Brainstorm',
  'Force Spike',
  'High Tide',
  'Mystical Tutor',
  'Repeal',
  'Spell Pierce',
  'Brain Freeze',
  'Counterspell',
  'Daze',
  'Impulse',
  'Into the Roil',
  'Mana Drain',
  'Mana Leak',
  'Remand',
  'Force of Negation',
  'Cryptic Command',
  'Fact or Fiction',
  'Force of Will',
  'Dig Through Time',
  'Gitaxian Probe',
  'Ponder',
  'Preordain',
  'Time Walk',
  'Compulsive Research',
  'Timetwister',
  "Tezzeret's Gambit",
  'Time Warp',
  'Echo of Eons',
  'Mox Sapphire',
  'Evolved Sleeper',
  'Putrid Imp',
  'Dark Confidant',
  'Glint-Sleeve Siphoner',
  'Kitesail Freebooter',
  'Mesmeric Fiend',
  "Oona's Prowler",
  'Pack Rat',
  'Bone Shredder',
  'Ophiomancer',
  'Phyrexian Rager',
  'Vampire Nighthawk',
  'Woe Strider',
  'Gonti, Lord of Luxury',
  'Rankle, Master of Pranks',
  'Sheoldred, the Apocalypse',
  'Shriekmaw',
  'Grave Titan',
  'Massacre Wurm',
  'Noxious Gearhulk',
  'Griselbrand',
  'Slaughter Pact',
  'Entomb',
  'Fatal Push',
  'Vampiric Tutor',
  'Costly Plunder',
  'Diabolic Edict',
  'Dismember',
  'Snuff Out',
  'Murderous Cut',
  'Duress',
  'Inquisition of Kozilek',
  'Reanimate',
  'Collective Brutality',
  'Demonic Tutor',
  'Exhume',
  'Hymn to Tourach',
  'Buried Alive',
  'Toxic Deluge',
  "Yawgmoth's Will",
  'Mox Jet',
  "Bolas's Citadel",
  'Animate Dead',
  'Necromancy',
  'Recurring Nightmare',
  'Bomat Courier',
  'Goblin Welder',
  'Grim Lavamancer',
  'Ragavan, Nimble Pilferer',
  'Lightning Mauler',
  'Combat Celebrant',
  'Laelia, the Blade Reforged',
  'Flametongue Kavu',
  'Hazoret the Fervent',
  'Hellrider',
  'Pia and Kiran Nalaar',
  'Fury',
  'Glorybringer',
  'Goldspan Dragon',
  'Zealous Conscripts',
  'Inferno Titan',
  'Greater Gargadon',
  'Chandra, Torch of Defiance',
  'Koth of the Hammer',
  'Chandra Nalaar',
  'Burst Lightning',
  'Lightning Bolt',
  'Abrade',
  'Searing Blaze',
  'Searing Spear',
  'Smash to Smithereens',
  'Mine Collapse',
  'Through the Breach',
  'Fireblast',
  'Bonfire of the Damned',
  'Chain Lightning',
  'Faithless Looting',
  'Flame Slash',
  'Forked Bolt',
  'Release the Gremlins',
  'Arc Trail',
  'Cathartic Reunion',
  'Wheel of Fortune',
  'Wildfire',
  'Mox Ruby',
  'Underworld Breach',
  'Fable of the Mirror-Breaker',
  'Sneak Attack',
  'Birds of Paradise',
  'Joraga Treespeaker',
  'Llanowar Elves',
  'Channeler Initiate',
  'Lotus Cobra',
  'Rofellos, Llanowar Emissary',
  'Scavenging Ooze',
  'Wall of Blossoms',
  'Wall of Roots',
  'Courser of Kruphix',
  'Eternal Witness',
  'Manglehorn',
  'Prowling Serpopard',
  'Ramunap Excavator',
  'Rhonas the Indomitable',
  'Oracle of Mul Daya',
  'Questing Beast',
  'Thrun, the Last Troll',
  'Acidic Slime',
  'Thragtusk',
  'Carnage Tyrant',
  'Primeval Titan',
  'Avenger of Zendikar',
  'Craterhoof Behemoth',
  'Terastodon',
  'Woodfall Primus',
  'Garruk, Primal Hunter',
  'Worldly Tutor',
  'Beast Within',
  'Chord of Calling',
  'Collected Company',
  "Pair o' Dice Lost",
  "Green Sun's Zenith",
  'Channel',
  'Explore',
  'Farseek',
  'Regrowth',
  'Search for Tomorrow',
  'See the Unwritten',
  'Mox Emerald',
  'Birthing Pod',
  "Esika's Chariot",
  'Exploration',
  'Fastbond',
  'Rancor',
  'Sylvan Library',
  'Talisman of Progress',
  'Spell Queller',
  'Teferi, Time Raveler',
  'Fractured Identity',
  'Teferi, Hero of Dominaria',
  'Baleful Strix',
  'Talisman of Dominance',
  'Thief of Sanity',
  'Kaito, Dancing Shadow',
  'Fallen Shinobi',
  'The Scarab God',
  'Talisman of Indulgence',
  'Terminate',
  'Daretti, Ingenious Iconoclast',
  "Kolaghan's Command",
  'Cut // Ribbons',
  'Falkenrath Aristocrat',
  'Bituminous Blast',
  'Ancient Grudge',
  'Manamorphose',
  'Talisman of Impulse',
  'Wrenn and Six',
  'Bloodbraid Elf',
  'Minsc & Boo, Timeless Heroes',
  'Talisman of Unity',
  'Knight of the Reliquary',
  'Renegade Rallier',
  'Talisman of Hierarchy',
  'Tidehollow Sculler',
  'Lingering Souls',
  'Lurrus of the Dream-Den',
  'Vindicate',
  'Expressive Iteration',
  'Izzet Charm',
  'Talisman of Creativity',
  'Dack Fayden',
  'Electrolyze',
  'Prismari Command',
  'Saheeli, Sublime Artificer',
  'Fire // Ice',
  'Putrid Leech',
  'Talisman of Resilience',
  'Maelstrom Pulse',
  'Vraska, Relic Seeker',
  'Figure of Destiny',
  'Talisman of Conviction',
  'Growth Spiral',
  'Hydroid Krasis',
  'Suspicious Stowaway',
  'Talisman of Curiosity',
  'Oko, Thief of Crowns',
  "Uro, Titan of Nature's Wrath",
  'Sail into the West',
  'Noble Hierarch',
  'Sphinx of the Steel Wind',
  'Ignoble Hierarch',
  'Broodmate Dragon',
  'Rattleclaw Mystic',
  'Siege Rhino',
  'Leovold, Emissary of Trest',
  'Tasigur, the Golden Fang',
  'Omnath, Locus of Creation',
  'Atraxa, Grand Unifier',
  'Jack-in-the-Mox',
  'Golos, Tireless Pilgrim',
  'Walking Ballista',
  'Oblivion Sower',
  'Wurmcoil Engine',
  'Myr Battlesphere',
  'Emrakul, the Aeons Torn',
  'Sundering Titan',
  'Karn, Scion of Urza',
  'Karn Liberated',
  'Ugin, the Spirit Dragon',
  'Black Lotus',
  "Lion's Eye Diamond",
  'Lotus Petal',
  'Mana Crypt',
  'Mox Diamond',
  'Zuran Orb',
  'Candelabra of Tawnos',
  'Chromatic Sphere',
  'Chromatic Star',
  'Mana Vault',
  'Retrofitter Foundry',
  'Skullclamp',
  'Sol Ring',
  'Grim Monolith',
  'Helm of Awakening',
  'Pentad Prism',
  "Smuggler's Copter",
  'Basalt Monolith',
  'Coalition Relic',
  'Crucible of Worlds',
  'Worn Powerstone',
  'Batterskull',
  'Memory Jar',
  "God-Pharaoh's Gift",
  'Hallowed Fountain',
  'Prairie Stream',
  'Tundra',
  'Sunken Hollow',
  'Underground Sea',
  'Watery Grave',
  'Badlands',
  'Blood Crypt',
  'Smoldering Marsh',
  'Cinder Glade',
  'Raging Ravine',
  'Stomping Ground',
  'Taiga',
  'Canopy Vista',
  'Savannah',
  'Temple Garden',
  'Godless Shrine',
  'Scrubland',
  'Steam Vents',
  'Volcanic Island',
  'Bayou',
  'Overgrown Tomb',
  'Plateau',
  'Sacred Foundry',
  'Breeding Pool',
  'Tropical Island',
  "Spara's Headquarters",
  "Raffine's Tower",
  "Xander's Lounge",
  "Ziatora's Proving Ground",
  "Jetmir's Garden",
  'Savai Triome',
  'Ketria Triome',
  'Indatha Triome',
  'Raugrin Triome',
  'Zagoth Triome',
  'Ancient Tomb',
  'Arid Mesa',
  'Bloodstained Mire',
  'Flooded Strand',
  "Gaea's Cradle",
  'Karakas',
  'Library of Alexandria',
  'Mana Confluence',
  'Marsh Flats',
  'Misty Rainforest',
  'Polluted Delta',
  'Prismatic Vista',
  'Scalding Tarn',
  'Shelldock Isle',
  'Strip Mine',
  'Tolarian Academy',
  "Urza's Saga",
  'Verdant Catacombs',
  'Wasteland',
  'Windswept Heath',
  'Wooded Foothills',
];
