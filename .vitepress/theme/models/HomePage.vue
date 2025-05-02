<script setup lang="ts">
import { MenuItem } from "../../interfaces/MenuItem";
import ParallaxImage from "../widgets/ParallaxImage.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vOnscreen } from "../widgets/onscreen.directive";
import {
  faBolt,
  faCogs,
  faComments,
  faEye,
  faUsers,
  faMap,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";

const menu: MenuItem[] = [
  { href: "/realisations", title: "Réalisations", icon: faLandmark },
  { href: "/clients", title: "Clients", icon: faUsers },
  { href: "/carte", title: "Carte", icon: faMap },
];
</script>

<template>
  <main class="flex flex-grow flex-col">
    <section class="relative block h-[80vh] bg-fuchsia-900 text-white">
      <div role="presentation" class="background absolute block">
        <img
          src="/home/plan.svg"
          alt="Plan"
          class=""
          width="1024"
          height="1024"
        />
      </div>
      <div class="flex h-full flex-col items-center justify-center gap-12 px-4">
        <p class="text-center text-4xl font-bold italic md:text-6xl">
          Réussissez votre projet architectural&nbsp;!
        </p>
        <div
          class="flex w-full flex-col flex-wrap gap-y-5 sm:flex-row sm:justify-center sm:gap-x-20"
        >
          <a
            v-for="item in menu"
            :key="item.title"
            :href="item.href"
            class="flex cursor-pointer items-center justify-center gap-2 border border-white px-8 py-4 text-center text-xl hover:bg-white hover:bg-opacity-10 sm:text-4xl"
            :class="{
              'bg-opacity-25': item.primary,
              'bg-white': item.primary,
              'hover:bg-opacity-35': item.primary,
            }"
            :target="item.newWindow ? '_blank' : '_self'"
          >
            <FontAwesomeIcon v-if="item.icon" :icon="item.icon" />
            <span>{{ item.title }}</span>
          </a>
        </div>
      </div>
    </section>
    <section>
      <div class="mx-auto max-w-4xl px-2 pb-4">
        <h1>Notre activité</h1>
        <p>
          Créé à Torcy (Seine et Marne) en 2003, notre cabinet d’architecture a
          pour objectif de
          <b>
            vous aider à faire de votre projet immobilier une véritable réussite
          </b>
          , dans la construction neuve comme dans l’ancien.
        </p>
        <p>
          Notre métier est de vous apporter notre expertise et nos services dans
          toutes les étapes relatives à un projet immobilier.
        </p>
        <p>
          Nous vous aidons en particulier sur les cinq thématiques suivantes :
        </p>
        <div v-onscreen="'introduce'" class="flex flex-row flex-wrap gap-x-10">
          <div class="flex w-full max-w-96 flex-col gap-4">
            <div class="block">
              <h2 class="block-title">
                <FontAwesomeIcon :icon="faCogs" /> Besoins
              </h2>
              <p>
                Définir votre projet, avant tout selon vos besoins, vos souhaits
                et vos goûts, et aussi vos contraintes.
              </p>
            </div>
            <div class="block">
              <h2 class="block-title">
                <FontAwesomeIcon :icon="faComments" /> Dialogue
              </h2>
              <p>
                Dialoguer avec les administrations, en particulier pour obtenir
                un permis de construire, une demande de travaux ou autre.
              </p>
            </div>
            <div class="block">
              <h2 class="block-title">
                <FontAwesomeIcon :icon="faUsers" /> Entrepreneurs
              </h2>
              <p>
                Identifier et sélectionner les entrepreneurs susceptibles de
                pouvoir réaliser les travaux.
              </p>
            </div>
          </div>
          <div class="flex w-full max-w-96 flex-col gap-4">
            <div class="block">
              <h2 class="block-title">
                <FontAwesomeIcon :icon="faEye" /> Suivi
              </h2>
              <p>Organiser et suivre les chantiers et leur bonne réception.</p>
            </div>
            <div class="block">
              <h2 class="block-title">
                <FontAwesomeIcon :icon="faBolt" /> Gestion
              </h2>
              <p>
                Gérer les perturbations éventuelles avec les règles du métier.
              </p>
            </div>
          </div>
        </div>
        <p>
          N’hésitez pas à nous consulter pour un devis ou tout simplement parler
          de votre projet. Sauf cas exceptionnel, le premier rendez-vous de
          prise de contact est gratuit, de préférence sur le lieu du projet.
        </p>
        <p>
          Nous sommes aussi bien expérimentés dans la construction neuve que
          dans la rénovation, la réhabilitation et la restauration de l’ancien
          (corps de ferme, etc.). Nous sommes des passionnés d’histoire et de
          patrimoine.
        </p>
        <p>
          Nous travaillons aussi sur des projets de taille plus importante pour
          des organismes publics dans le cadre de la restauration du patrimoine
          français (châteaux, églises, anciens bâtiments industriels). Nous vous
          invitons à consulter sur notre site quelques examples de projet
          réalisés ou en cours.
        </p>
      </div>
    </section>
    <section class="parallax">
      <ParallaxImage
        portrait="/home/ferrieres-portrait.jpg"
        landscape="/home/ferrieres-landscape.jpg"
        alt="Chateau de Ferrières en brie (1855-1859, famille Rothschield), restauration par notre catbinet en 2015."
      />
      <div class="bg-white text-center">
        Chateau de Ferrières-en-Brie (1855-1859, famille Rothschild),
        restauration par notre cabinet en 2016.
      </div>
    </section>
    <section>
      <div v-onscreen="'introduce'" class="mx-auto max-w-4xl px-2 pb-24 pt-16">
        <h1>Les architectes</h1>
        <h2 class="block-title">
          Suzana DEMETRESCU-GUÉNÉGO (Responsable du cabinet)
        </h2>
        <ul>
          <li>
            Architecte du patrimoine, diplômée du Centre des Hautes Etudes de
            Chaillot (Paris - France)
          </li>
          <li>
            Architecte DPLG, diplômée de l’Ecole d’Architecture de Paris
            Val-de-Seine
          </li>
          <li>
            Architecte-Urbaniste DUAB (diplômée de l’Ecole d’Architecture et
            d'Urbanisme Ion Mincu Bucarest)
          </li>
          <li>Inscrite au tableau de l'ordre des architectes</li>
        </ul>
        <h2 class="block-title">Lizica DEMETRESCU</h2>
        <ul>
          <li>
            Architecte-Urbaniste DIAB (diplômée de l’Institut d’Architecture et
            d'Urbanisme Ion Mincu de Bucarest)
          </li>
        </ul>
        <h2 class="block-title">Florent MASSUCCI</h2>
        <ul>
          <li>Architecte diplômé d'état (Paris Val de Seine)</li>
          <li>Expert Autodesk Autocad, Revit et BIM.</li>
        </ul>
        <h2 class="block-title">Claire BARBEY-PAYNEAU</h2>
        <ul>
          <li>Architecte diplômé d'état HMONP</li>
          <li>
            Architecte du patrimoine, diplômée de l’école de Chaillot (Paris -
            France)
          </li>
        </ul>
        <p>
          <b>Notre cabinet d'architecture se développe et recrute ! </b>Pour
          nous faire parvenir votre CV,
          <a href="/contact" class="cursor-pointer text-blue-700 underline"
            >contactez nous</a
          >.
        </p>
      </div>
    </section>
  </main>
</template>
