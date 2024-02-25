<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selector v-model="pizzaModel.dough" :items="doughItems" />

        <diameter-selector v-model="pizzaModel.size" :items="sizeItems" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selector v-model="pizzaModel.sauce" :items="sauceItems" />

              <ingredients-selector
                v-model="pizzaModel.ingredients"
                :items="ingredientItems"
                @update="updateIngredientAmount"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizzaModel.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-constructor
            :dough="pizzaModel.dough"
            :sauce="pizzaModel.sauce"
            :ingredients="pizzaModel.ingredients"
            @drop="addIngredient"
          />

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" :disabled="disableSubmit">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, computed } from "vue";

import doughJSON from "../mocks/dough.json";
import sizesJSON from "../mocks/sizes.json";
import saucesJSON from "../mocks/sauces.json";
import ingredientsJSON from "../mocks/ingredients.json";

import {
  normalizeSauces,
  normalizeDough,
  normalizeSize,
  normalizeIngredients,
} from "@/common/helpers/normalize.js";

import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import DiameterSelector from "@/modules/constructor/DiameterSelector.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";

const doughItems = doughJSON.map(normalizeDough);
const sizeItems = sizesJSON.map(normalizeSize);
const sauceItems = saucesJSON.map(normalizeSauces);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);

const pizzaModel = reactive({
  name: "",
  dough: doughItems[0].value,
  size: sizeItems[0].value,
  sauce: sauceItems[0].value,
  ingredients: ingredientItems.reduce((acc, item) => {
    acc[item.value] = 0;
    return acc;
  }, {}),
});

const price = computed(() => {
  const { dough, size, sauce, ingredients } = pizzaModel;

  const sizeMultiplier =
    sizeItems.find((item) => item.value === size)?.multiplier ?? 1;

  const doughPrice =
    doughItems.find((item) => item.value === dough)?.price ?? 0;

  const saucePrice =
    sauceItems.find((item) => item.value === sauce)?.price ?? 0;

  /*
   * Здесь мы при помощи метода map превращаем массив ингредиентов
   * в массив значений, соответствующих итоговой стоимости каждого из них - просто умножив известную цену на количество.
   * После чего методом reduce вычисляем сумму всех элементов массива, что даст нам общую стоимость всех ингредиентов.
   */
  const ingredientsPrice = ingredientItems
    .map((item) => ingredients[item.value] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});

const disableSubmit = computed(() => {
  return pizzaModel.name.length === 0 || price.value === 0;
});

const addIngredient = (ingredient) => {
  pizzaModel.ingredients[ingredient]++;
};

const updateIngredientAmount = (ingredient, count) => {
  pizzaModel.ingredients[ingredient] = count;
};
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
