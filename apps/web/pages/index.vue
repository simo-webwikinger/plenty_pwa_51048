<template>
  <div>
    <EmptyBlock v-if="dataIsEmpty" @add-new-block="addNewBlock(0, 1)"></EmptyBlock>
    <Editor
      v-if="isEditing && currentBlockIndex !== null"
      :index="currentBlockIndex"
      :block="currentBlock"
      @update="updateBlock"
    />
    <div v-else class="content">
      <template v-for="(block, index) in data.blocks" :key="index">
        <PageBlock
          :index="index"
          :block="block"
          :is-preview="isPreview"
          :disable-actions="disableActions"
          :is-clicked="isClicked"
          :clicked-block-index="clickedBlockIndex"
          :is-tablet="isTablet"
          :show-newsletter="showNewsletter"
          :block-has-data="blockHasData"
          :get-component="getComponent"
          :tablet-edit="tabletEdit"
          :add-new-block="addNewBlock"
          :handle-edit="handleEdit"
          :delete-block="deleteBlock"
          class="mx-8 md:mx-24 first:mx-0"
        />
      </template>
      <UiTeaser
      title="Alpinaweiss"
      subtitle="MEHR WEISS, MEHR SPAREN"
      description="Nur solange der Vorrat reicht! Jetzt 1 oder 2 Aktionseimer Alpinaweiß Das Original 10 L kaufen und 7,50 € oder 20 € Cashback sichern."
      desktopImage="/images/home_teaser_dt.jpg"
      mobileImage="/images/home_teaser_mb.jpg"
      altText="altText"
      buttontext="Zum Angebot"
      :textblack=false
    />
      <UiTeaser
      title="Alpina Rollputz"
      subtitle="20 % mehr Inhalt gratis!"
      description="Nur für kurze Zeit und solange der Vorrat reicht. In einem Arbeitsschritt zu perfekt strukturierten Wänden: Nur 1 x aufrollen – fertig!"
      desktopImage="/images/home_teaser_dt2.jpg"
      mobileImage="/images/home_teaser_mb2.jpg"
      altText="altText"
      buttontext="Jetzt entdecken"
      :textblack=true
    />
    <div class="mx-8 md:mx-24 my-4 md:my-8">
    <ProductRecommendedProducts
      headline="Entdecken Sie unsere Modekollektion"
      categoryId="16"
    />
    </div>
    <div class="mx-8 md:mx-24 my-4 md:my-8">
      <NewsletterSubscribe
        email="E-Mail"
        firstName="Vorname"
        heading="Abonnieren Sie unseren Newsletter"
        info="Informieren Sie sich über bevorstehende Aktionen und Veranstaltungen. Erhalten Sie Geschenke und Sonderangebote!"
        lastName="Nachname"
        policy="Ich bestätige hiermit, dass ich die {privacyPolicy} gelesen habe. Ich kann meine Einwilligung jederzeit widerrufen."
        subscribe="Newsletter abonnieren"
        success="Vielen Dank für Ihre Anmeldung! Bitte prüfen Sie Ihr E-Mail-Postfach und klicken Sie auf den Bestätigungslink in unserer Nachricht, um den Newsletter zu abonnieren."
      />
    </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import homepageTemplateDataEn from '../composables/useHomepage/homepageTemplateDataEn.json';
import homepageTemplateDataDe from '../composables/useHomepage/homepageTemplateDataDe.json';

const {
  currentBlock,
  currentBlockIndex,
  isClicked,
  clickedBlockIndex,
  isTablet,
  isPreview,
  blockHasData,
  tabletEdit,
  handleEdit,
  deleteBlock,
  updateBlock,
} = useBlockManager();

const { data, fetchPageTemplate, dataIsEmpty } = useHomepage();
const { showNewsletter } = useNewsletter();
const { $i18n } = useNuxtApp();

const defaultAddBlock = (lang: string) => {
  return lang === 'en' ? homepageTemplateDataEn.blocks[1] : homepageTemplateDataDe.blocks[1];
};

const addNewBlock = (index: number, position: number) => {
  const insertIndex = position === -1 ? index : index + 1;
  const updatedBlocks = [...data.value.blocks];

  updatedBlocks.splice(insertIndex, 0, defaultAddBlock($i18n.locale.value));

  data.value.blocks = updatedBlocks;
};

const { isEditing, disableActions } = useEditor();

const getComponent = (name: string) => {
  // if (name === 'NewsletterSubscribe') return resolveComponent('NewsletterSubscribe');
  if (name === 'UiHeroCarousel') return resolveComponent('UiHeroCarousel');
  // if (name === 'UiMediaCard') return resolveComponent('UiMediaCard');
  // if (name === 'ProductRecommendedProducts') return resolveComponent('ProductRecommendedProducts');
};

fetchPageTemplate();
</script>
