"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.scss";
import { LineParseTextarea } from "@/components/LineParseTextarea";
import { Icon } from "@iconify/react";
import { CopiedToast } from "@/components/CopiedToast";
import { AutocompleteInput } from "@/components/AutocompleteInput";

export default function Home() {
  const [cubeList, setCubeList] = useState<string[]>(list);
  const [removedCards, setRemovedCards] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [removeType, setRemoveType] = useState("select");
  const removeCardsTextareaRef = useRef<HTMLTextAreaElement>(null);

  const remainingCards = useMemo(() => {
    const cubeSet = new Set(cubeList);
    removedCards.forEach((card) => cubeSet.delete(card));
    return Array.from(cubeSet);
  }, [cubeList, removedCards]);

  useEffect(() => {
    if (removeType === "paste" && removeCardsTextareaRef.current)
      removeCardsTextareaRef.current.value = removedCards.join("\n");
  }, [removeType, removedCards]);

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
          value={list.join("\n")}
        />
      </section>

      <section>
        <section className={styles.header}>
          <h2>Removed Cards</h2>

          <select
            onChange={({ currentTarget: { value } }) => setRemoveType(value)}
          >
            <option value="select">Select from Cube</option>
            <option value="paste">Paste</option>
          </select>

          <p className={styles.count}>{removedCards.length} cards</p>
        </section>

        {removeType === "select" && (
          <div className={styles.removed}>
            <AutocompleteInput
              clearOnSelect
              items={selectItems}
              onSelect={(selected) =>
                setRemovedCards((cur) => [...cur, selected])
              }
            />

            {removedCards.map((removed) => (
              <div className={styles.removedCard} key={removed}>
                <Icon
                  icon="material-symbols:delete-outline"
                  onClick={() =>
                    setRemovedCards((cur) => cur.filter((r) => r !== removed))
                  }
                />

                <span>{removed}</span>
              </div>
            ))}
          </div>
        )}

        {removeType === "paste" && (
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
            icon="material-symbols:content-copy-outline"
            onClick={() => {
              navigator.clipboard.writeText(remainingCards.join("\n"));
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
  "Giver of Runes",
  "Mother of Runes",
  "Thraben Inspector",
  "Adanto Vanguard",
  "Cathar Commando",
  "Kor Firewalker",
  "Lion Sash",
  "Luminarch Aspirant",
  "Spirited Companion",
  "Stoneforge Mystic",
  "Thalia, Guardian of Thraben",
  "Wall of Omens",
  "Blade Splicer",
  "Flickerwisp",
  "Monastery Mentor",
  "Porcelain Legionnaire",
  "Silverblade Paladin",
  "Skyclave Apparition",
  "Welcoming Vampire",
  "Hero of Bladehold",
  "Palace Jailer",
  "Restoration Angel",
  "Teshar, Ancestor's Apostle",
  "Angel of Sanctions",
  "Cloudgoat Ranger",
  "Reveillark",
  "Solitude",
  "Eagles of the North",
  "Elesh Norn, Grand Cenobite",
  "Gideon of the Trials",
  "Elspeth, Knight-Errant",
  "Gideon Jura",
  "Enlightened Tutor",
  "Path to Exile",
  "Swords to Plowshares",
  "Reprieve",
  "Unexpectedly Absent",
  "Gather the Townsfolk",
  "Council's Judgment",
  "Timely Reinforcements",
  "Day of Judgment",
  "Hallowed Burial",
  "Terminus",
  "Approach of the Second Sun",
  "Mox Pearl",
  "Glimmer Lens",
  "Journey to Nowhere",
  "Oblivion Ring",
  "Faith's Fetters",
  "Elspeth Conquers Death",
  "Looter il-Kor",
  "Malcolm, Alluring Scoundrel",
  "Phantasmal Image",
  "Snapcaster Mage",
  "Thieving Skydiver",
  "Brazen Borrower",
  "Chrome Host Seedshark",
  "Emry, Lurker of the Loch",
  "Hullbreacher",
  "Sai, Master Thopterist",
  "Spellseeker",
  "Vendilion Clique",
  "Phyrexian Metamorph",
  "Stoic Sphinx",
  "Subtlety",
  "Urza, Lord High Artificer",
  "Feywild Caretaker",
  "Torrential Gearhulk",
  "Jace Beleren",
  "Narset, Parter of Veils",
  "Jace, the Mind Sculptor",
  "Ancestral Recall",
  "Brainstorm",
  "High Tide",
  "Mystical Tutor",
  "Spell Pierce",
  "Stern Scolding",
  "Brain Freeze",
  "Counterspell",
  "Daze",
  "Deduce",
  "Flash",
  "Impulse",
  "Mana Drain",
  "Mana Leak",
  "Remand",
  "Force of Negation",
  "Cryptic Command",
  "Force of Will",
  "Mystic Confluence",
  "Dig Through Time",
  "Gitaxian Probe",
  "Ponder",
  "Preordain",
  "Time Walk",
  "Timetwister",
  "Tinker",
  "Lórien Revealed",
  "Time Warp",
  "Echo of Eons",
  "Mox Sapphire",
  "Evolved Sleeper",
  "Putrid Imp",
  "Dark Confidant",
  "Glint-Sleeve Siphoner",
  "Kitesail Freebooter",
  "Mesmeric Fiend",
  "Oona's Prowler",
  "Pack Rat",
  "Bone Shredder",
  "Ophiomancer",
  "Phyrexian Rager",
  "Vampire Nighthawk",
  "Woe Strider",
  "Gonti, Lord of Luxury",
  "Rankle, Master of Pranks",
  "Sheoldred, the Apocalypse",
  "Shriekmaw",
  "Crabomination",
  "Grave Titan",
  "Massacre Wurm",
  "Noxious Gearhulk",
  "Troll of Khazad-dûm",
  "Griselbrand",
  "Slaughter Pact",
  "Entomb",
  "Fatal Push",
  "Vampiric Tutor",
  "Costly Plunder",
  "Diabolic Edict",
  "Eviscerator's Insight",
  "Dismember",
  "Snuff Out",
  "Murderous Cut",
  "Duress",
  "Inquisition of Kozilek",
  "Reanimate",
  "Unearth",
  "Collective Brutality",
  "Demonic Tutor",
  "Exhume",
  "Hymn to Tourach",
  "Buried Alive",
  "Toxic Deluge",
  "Yawgmoth's Will",
  "Mox Jet",
  "Bolas's Citadel",
  "Animate Dead",
  "Call of the Ring",
  "Necromancy",
  "Recurring Nightmare",
  "Bomat Courier",
  "Dragon's Rage Channeler",
  "Grim Lavamancer",
  "Monastery Swiftspear",
  "Ragavan, Nimble Pilferer",
  "Robber of the Rich",
  "Scrapwork Mutt",
  "Young Pyromancer",
  "Bonecrusher Giant",
  "Combat Celebrant",
  "Gut, True Soul Zealot",
  "Laelia, the Blade Reforged",
  "Caves of Chaos Adventurer",
  "Flametongue Kavu",
  "Hazoret the Fervent",
  "Hellrider",
  "Pia and Kiran Nalaar",
  "Fury",
  "Glorybringer",
  "Goldspan Dragon",
  "Zealous Conscripts",
  "Inferno Titan",
  "Oliphaunt",
  "Greater Gargadon",
  "Chandra, Torch of Defiance",
  "Burst Lightning",
  "Lightning Bolt",
  "Unholy Heat",
  "Abrade",
  "Searing Spear",
  "Smash to Smithereens",
  "Blast from the Past",
  "Mine Collapse",
  "Through the Breach",
  "Fireblast",
  "Chain Lightning",
  "Faithless Looting",
  "Flame Slash",
  "Arc Trail",
  "Cathartic Reunion",
  "Light Up the Stage",
  "Wheel of Fortune",
  "Fiery Confluence",
  "Wildfire",
  "Mox Ruby",
  "Bitter Reunion",
  "Underworld Breach",
  "Case of the Crimson Pulse",
  "Fable of the Mirror-Breaker",
  "Sneak Attack",
  "Birds of Paradise",
  "Joraga Treespeaker",
  "Llanowar Elves",
  "Channeler Initiate",
  "Lotus Cobra",
  "Nishoba Brawler",
  "Rofellos, Llanowar Emissary",
  "Scavenging Ooze",
  "Wall of Blossoms",
  "Wall of Roots",
  "Courser of Kruphix",
  "Eternal Witness",
  "Manglehorn",
  "Prowling Serpopard",
  "Ramunap Excavator",
  "Rhonas the Indomitable",
  "Oracle of Mul Daya",
  "Questing Beast",
  "Thrun, the Last Troll",
  "Undermountain Adventurer",
  "Acidic Slime",
  "Thragtusk",
  "Carnage Tyrant",
  "Generous Ent",
  "Primeval Titan",
  "Avenger of Zendikar",
  "Craterhoof Behemoth",
  "Terastodon",
  "Woodfall Primus",
  "Garruk, Primal Hunter",
  "Worldly Tutor",
  "Beast Within",
  "Invigorate",
  "Collected Company",
  "Pair o' Dice Lost",
  "Green Sun's Zenith",
  "Channel",
  "Explore",
  "Farseek",
  "Nature's Lore",
  "Regrowth",
  "Search for Tomorrow",
  "See the Unwritten",
  "Mox Emerald",
  "Birthing Pod",
  "Esika's Chariot",
  "Exploration",
  "Fastbond",
  "Rancor",
  "Sylvan Library",
  "Talisman of Progress",
  "Teferi, Time Raveler",
  "Fractured Identity",
  "Teferi, Hero of Dominaria",
  "Baleful Strix",
  "Talisman of Dominance",
  "Sauron's Ransom",
  "Thief of Sanity",
  "Kaito, Dancing Shadow",
  "Fallen Shinobi",
  "The Scarab God",
  "Angrath's Rampage",
  "Talisman of Indulgence",
  "Terminate",
  "Carnage Interpreter",
  "Daretti, Ingenious Iconoclast",
  "Kolaghan's Command",
  "Cut // Ribbons",
  "Bituminous Blast",
  "Manamorphose",
  "Talisman of Impulse",
  "Territorial Kavu",
  "Wrenn and Six",
  "Bloodbraid Elf",
  "Minsc & Boo, Timeless Heroes",
  "Talisman of Unity",
  "Cosmic Rebirth",
  "Knight of the Reliquary",
  "Talisman of Hierarchy",
  "Tidehollow Sculler",
  "Lingering Souls",
  "Lurrus of the Dream-Den",
  "Vindicate",
  "Expressive Iteration",
  "Izzet Charm",
  "Talisman of Creativity",
  "Dack Fayden",
  "Electrolyze",
  "Prismari Command",
  "Saheeli, Sublime Artificer",
  "Fire // Ice",
  "Talisman of Resilience",
  "Maelstrom Pulse",
  "Pick Your Poison",
  "Figure of Destiny",
  "Forth Eorlingas!",
  "Talisman of Conviction",
  "Comet, Stellar Pup",
  "Growth Spiral",
  "Suspicious Stowaway",
  "Talisman of Curiosity",
  "Oko, Thief of Crowns",
  "Uro, Titan of Nature's Wrath",
  "Sail into the West",
  "Noble Hierarch",
  "Thopter Foundry",
  "Sphinx of the Steel Wind",
  "Ignoble Hierarch",
  "Rattleclaw Mystic",
  "Leovold, Emissary of Trest",
  "Tasigur, the Golden Fang",
  "Omnath, Locus of Creation",
  "Atraxa, Grand Unifier",
  "Jack-in-the-Mox",
  "Golos, Tireless Pilgrim",
  "Walking Ballista",
  "Myr Battlesphere",
  "Emrakul, the Aeons Torn",
  "Sundering Titan",
  "Karn, Scion of Urza",
  "Karn Liberated",
  "Ugin, the Spirit Dragon",
  "Black Lotus",
  "Lion's Eye Diamond",
  "Lotus Petal",
  "Mana Crypt",
  "Mishra's Bauble",
  "Mox Diamond",
  "Urza's Bauble",
  "Zuran Orb",
  "Candelabra of Tawnos",
  "Chromatic Sphere",
  "Chromatic Star",
  "Mana Vault",
  "Retrofitter Foundry",
  "Skullclamp",
  "Sol Ring",
  "Grim Monolith",
  "Pentad Prism",
  "Smuggler's Copter",
  "Sword of the Meek",
  "Basalt Monolith",
  "Coalition Relic",
  "Crucible of Worlds",
  "Worn Powerstone",
  "Batterskull",
  "Memory Jar",
  "God-Pharaoh's Gift",
  "Celestial Colonnade",
  "Hallowed Fountain",
  "Prairie Stream",
  "Restless Anchorage",
  "Tundra",
  "Creeping Tar Pit",
  "Sunken Hollow",
  "Underground Sea",
  "Watery Grave",
  "Badlands",
  "Blood Crypt",
  "Restless Vents",
  "Smoldering Marsh",
  "Cinder Glade",
  "Raging Ravine",
  "Stomping Ground",
  "Taiga",
  "Canopy Vista",
  "Restless Prairie",
  "Savannah",
  "Temple Garden",
  "Godless Shrine",
  "Scrubland",
  "Steam Vents",
  "Volcanic Island",
  "Bayou",
  "Overgrown Tomb",
  "Plateau",
  "Sacred Foundry",
  "Breeding Pool",
  "Restless Vinestalk",
  "Tropical Island",
  "Spara's Headquarters",
  "Raffine's Tower",
  "Xander's Lounge",
  "Ziatora's Proving Ground",
  "Jetmir's Garden",
  "Savai Triome",
  "Ketria Triome",
  "Indatha Triome",
  "Raugrin Triome",
  "Zagoth Triome",
  "Ancient Tomb",
  "Arid Mesa",
  "Bloodstained Mire",
  "Flooded Strand",
  "Gaea's Cradle",
  "Karakas",
  "Library of Alexandria",
  "Mana Confluence",
  "Marsh Flats",
  "Misty Rainforest",
  "Polluted Delta",
  "Prismatic Vista",
  "Scalding Tarn",
  "Shelldock Isle",
  "Strip Mine",
  "Tolarian Academy",
  "Urza's Saga",
  "Verdant Catacombs",
  "Wasteland",
  "Windswept Heath",
  "Wooded Foothills",
];
