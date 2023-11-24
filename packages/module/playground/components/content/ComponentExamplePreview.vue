<template>
  <div>
    <div
      class="mt-8 mb-4 flex w-max bg-gray-950 border border-gray-800 gap-1 rounded-lg p-1"
    >
      <SenpButton
        size="sm"
        :intent="state.componentBackground === 'dim' ? 'primary' : 'secondary'"
        @click="state.componentBackground = 'dim'"
      >
        dim
      </SenpButton>
      <SenpButton
        size="sm"
        :intent="
          state.componentBackground === 'bright' ? 'primary' : 'secondary'
        "
        @click="state.componentBackground = 'bright'"
      >
        bright
      </SenpButton>
      <SenpButton
        size="sm"
        :intent="
          state.componentBackground === 'white' ? 'primary' : 'secondary'
        "
        @click="state.componentBackground = 'white'"
      >
        white
      </SenpButton>
      <SenpButton
        size="sm"
        :intent="
          state.componentBackground === 'black' ? 'primary' : 'secondary'
        "
        @click="state.componentBackground = 'black'"
      >
        black
      </SenpButton>
    </div>
    <div
      v-if="Comp"
      class="component-wrapper no-prose not-prose"
      :class="{
        'border border-black bg-gray-800': state.componentBackground === 'dim',
        'border border-white bg-gray-300':
          state.componentBackground === 'bright',
        'border border-gray-300 bg-white':
          state.componentBackground === 'white',
        'border border-gray-800 bg-black':
          state.componentBackground === 'black',
      }"
    >
      <Component :is="Comp" />
    </div>
    <div
      class="mt-8 mb-4 flex w-max bg-gray-950 border border-gray-800 gap-1 rounded-lg p-1"
    >
      <SenpButton
        size="sm"
        :intent="state.mode === 'props' ? 'primary' : 'secondary'"
        @click="state.mode = 'props'"
      >
        props
      </SenpButton>
      <SenpButton
        size="sm"
        :intent="state.mode === 'slots' ? 'primary' : 'secondary'"
        @click="state.mode = 'slots'"
      >
        slots
      </SenpButton>
      <SenpButton
        size="sm"
        :intent="state.mode === 'code' ? 'primary' : 'secondary'"
        @click="state.mode = 'code'"
      >
        code
      </SenpButton>
    </div>

    <div v-if="state.mode === 'code'" class="not-prose bg-gray-950 rounded-xl">
      <SenpHighlight
        :classes="{ pre: { extend: '!overflow-visible' } }"
        language="vue"
        theme="nord"
        :value="codePreview"
      />
    </div>

    <div v-if="state.mode === 'props' && filteredProps" class="not-prose">
      <DataTable
        class="max-h-[36rem] [&_thead]:ring-1 [&_thead]:ring-gray-700 [&_table]:max-h-[36rem] [&_table]:overflow-auto [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-40"
        :rows="filteredProps"
        :columns="['Name', 'Description', 'Controls']"
      >
        <tr v-for="(row, i) in filteredProps" :key="'row-' + i">
          <td>
            <div>
              {{ row.name }}
            </div>
            <div v-if="row.required" style="font-size: 0.75em; color: #fbbf24">
              required*
            </div>
          </td>
          <td>
            <div
              class="max-w-xs text-xs"
              style="display: flex; flex-direction: column; gap: 0.75rem"
            >
              <pre class="whitespace-pre-wrap !leading-snug"><code
v-if="row.type"
                     style="color: #93c5fd;"
>{{
                       row.type.elements?.length
                         ? row.type.elements
                           .map((elem) => (typeof elem === 'object' ? JSON.stringify(elem) : elem))
                           .join(' | ')
                         : row.type.type
                     }}</code></pre>
              <div v-if="row.description" style="white-space: pre-wrap">
                {{ row.description }}
              </div>
              <p v-if="row.defaultValue" class="m-0">
                <code class="text-teal-400"
                  >(default: {{ row.defaultValue }})</code
                >
              </p>
            </div>
          </td>
          <td style="width: 20rem">
            <div style="width: 20rem; position: relative">
              <StoryControl
                :control-type="story.controls[row.name].type?.controlType"
                :type="story.controls[row.name].type?.type"
                :elements="story.controls[row.name].type?.elements"
                :model-value="(query.controls as any)?.[row.name] ?? (row.name in story.docs.render.args ? (story.docs.render.args as any)[row.name] : '')"
                @update:model-value="(val: any) => (query.controls as any)[row.name] = val"
              />
            </div>
          </td>
        </tr>
      </DataTable>
    </div>
    <div
      v-else-if="state.mode === 'props'"
      style="color: #d4d4d4; font-size: 0.875rem"
    >
      Component has no detected props
    </div>

    <div v-if="state.mode === 'slots' && filteredSlots" class="not-prose">
      <DataTable
        class="max-h-[36rem] [&_thead]:ring-1 [&_thead]:ring-gray-700 [&_table]:max-h-[36rem] [&_table]:overflow-auto [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-40"
        :rows="filteredSlots"
        :columns="['Name', 'Description', 'Bindings', 'Controls']"
      >
        <tr v-for="(row, i) in filteredSlots" :key="'row-' + i">
          <td>
            {{ row.name }}
          </td>
          <td>
            <div>
              <div v-if="row.description" style="white-space: pre-wrap">
                {{ row.description }}
              </div>
              <pre v-if="row.tags"><code>{{ row.tags }}</code></pre>
            </div>
          </td>
          <td>
            <pre
              class="text-[10px] text-blue-300"
            ><code>{{ row.bindings }}</code></pre>
          </td>
          <td style="width: 20rem">
            <div style="width: 20rem; position: relative">
              <StoryControl
                control-type="string"
                type="string"
                :model-value="(query.slots as any)?.[row.name] ?? (row.name in story.docs.render.slots ? story.docs.render.slots[row.name] : '')"
                @update:model-value="(val: any) => (query.slots as any)[row.name] = val"
              />
              <button
                v-if="(query.slots as any)[row.name] != null"
                style="
                  margin-top: 0.25rem;
                  background-color: #450a0a;
                  color: #fecaca;
                  padding: 0.25rem 0.5rem;
                  border-radius: 0.5rem;
                "
                @click="() => (query.slots as any)[row.name] = null"
              >
                Clear Slot
              </button>
            </div>
          </td>
        </tr>
      </DataTable>
    </div>
    <div
      v-else-if="state.mode === 'slots'"
      style="color: #d4d4d4; font-size: 0.875rem"
    >
      Component has no detected slots
    </div>
  </div>
</template>

<script setup lang="tsx">
import {
  type VNode,
  computed,
  defineComponent,
  h,
  reactive,
  useStoryUtils,
} from "#imports";
import type { DefineComponent } from "vue";
import type { ComponentDoc } from "vue-docgen-api";

const { generateControls, generateSlotControls } = useStoryUtils();
export type Component = (abstract new (...args: any) => any) & {
  props?: any;
} & {
  __docgenInfo?: ComponentDoc;
};
export type Story<T extends Component> = {
  component: T;
  title: string;
  args: InstanceType<T>["$props"];
  controls: ReturnType<typeof generateControls>;
  slots: {
    [slotName in keyof Partial<InstanceType<T>["$slots"]>]?:
      | Component
      | VNode
      | (() => VNode | null)
      | string
      | null;
  };
  slotControls?: ReturnType<typeof generateSlotControls>;
  render: (args: {
    props: InstanceType<T>["$props"];
    slots: InstanceType<T>["$slots"];
  }) => DefineComponent;
  docs: {
    description: string;
    content: string;
    render: {
      args: InstanceType<T>["$props"];
      slots: {
        [slotName in keyof Partial<InstanceType<T>["$slots"]>]?:
          | Component
          | VNode
          | (() => VNode | null)
          | string
          | null;
      };
      defaultRenderer: (args: {
        props: InstanceType<T>["$props"];
        slots: InstanceType<T>["$slots"];
      }) => DefineComponent;
    };
  };
};
const props = withDefaults(
  defineProps<{
    docgenInfo: ComponentDoc;
    story: Story<any>;
    initialSlots: any;
    initialControls: any;
    handleModels: Record<string, string>;
  }>(),
  {
    initialSlots: () => ({}),
    initialControls: () => ({}),
    handleModels: () => ({}),
  },
);

const query = reactive({
  slots: props.initialSlots,
  controls: props.initialControls,
});

const state = reactive({
  mode: "props" as "props" | "slots" | "code",
  componentBackground: "dim" as "dim" | "bright" | "white" | "black",
});

const tryParseOrDefault = (val: string, replacement: any = undefined) => {
  try {
    if (val.startsWith("'") && val.endsWith("'")) {
      // silly hacky nonsense bc we get string default values as "'my string contents'" which is not parseable
      const replaced = '"' + val.slice(1, -1) + '"';
      if (typeof tryParseOrDefault(replaced, false) === "string") {
        val = replaced;
      }
    }
    return JSON.parse(val);
  } catch (error) {
    return replacement;
  }
};

const parseElementsArray = (elements: any[]): any[] => {
  // [
  //   { "name": "Array", "elements": [ { "name": "Array", "elements": [ { "name": "string" } ] } ] },
  //   { "name": "Array", "elements": [ { "name": "Record", "elements": [ { "name": "string" }, { "name": "unknown" } ] } ] }
  // ]
  const primitiveTypeMap = {
    string: { type: "string", controlType: "string" },
    number: { type: "number", controlType: "number" },
    null: { type: "null", controlType: "null" },
    boolean: { type: "boolean", controlType: "boolean" },
    TSFunctionType: { type: "function", controlType: "function" },
    function: { type: "function", controlType: "function" },
    undefined: { type: "undefined", controlType: "null" },
    TSTupleType: { type: "array", controlType: "array" },
    array: { type: "array", controlType: "array" },
    object: { type: "object", controlType: "object" },
  };
  return elements.map((element) => {
    if (element.name === "Array") {
      return "Array<" + parseElementsArray(element.elements).join(", ") + ">";
    }
    if (element.name === "Record") {
      return "Record<" + parseElementsArray(element.elements).join(", ") + ">";
    }
    if (element.name in primitiveTypeMap) {
      return (primitiveTypeMap as any)[element.name].type;
    }
    return element?.name || element;
  });
};

const _parseComponentDocProps = (
  type: any,
): { type: string; controlType: string; elements?: any[] } => {
  const primitiveTypeMap = {
    string: { type: "string", controlType: "string" },
    number: { type: "number", controlType: "number" },
    null: { type: "null", controlType: "null" },
    boolean: { type: "boolean", controlType: "boolean" },
    TSFunctionType: { type: "function", controlType: "function" },
    function: { type: "function", controlType: "function" },
    undefined: { type: "undefined", controlType: "null" },
    TSTupleType: { type: "array", controlType: "array" },
    array: { type: "array", controlType: "array" },
    object: { type: "object", controlType: "object" },
  };
  if (type?.name in primitiveTypeMap) {
    return (primitiveTypeMap as any)[type?.name];
  }
  if ((type?.name + "").startsWith("{")) {
    return { type: type?.name, controlType: "object" };
  }
  if (type?.name === "union") {
    if (Array.isArray(type?.elements) && type.elements.length > 0) {
      if (
        type.elements.some(
          (elem: any) => elem.name === "Array" || elem.name === "Record",
        )
      ) {
        type.elements = parseElementsArray(type.elements);
      }
      const firstElementParsed = tryParseOrDefault(
        type.elements[0].name,
        undefined,
      );
      if (firstElementParsed === undefined) {
        return {
          type: type?.name,
          controlType: "null",
          elements: type.elements,
        };
      }
      if (
        (type.elements as { name: unknown }[]).every(
          ({ name }) =>
            typeof tryParseOrDefault(name + "", undefined) ===
            typeof firstElementParsed,
        ) &&
        typeof firstElementParsed in primitiveTypeMap
      ) {
        return {
          type: type?.name,
          controlType: (primitiveTypeMap as any)[typeof firstElementParsed]
            .controlType,
          elements: type.elements.map(({ name }: any) => name),
        };
      }
      return {
        type: type?.name,
        controlType: "null",
        elements: type.elements.map(({ name }: any) => name),
      };
    }
    return { type: type?.name, controlType: "null", elements: undefined };
  }
  if (
    type?.elements?.some(
      (elem: any) => elem.name === "Array" || elem.name === "Record",
    )
  ) {
    type.elements = parseElementsArray(type.elements);
  } else if (type.name === "Array" || type.name === "Record") {
    if (type.name === "Array") {
      type.elements = [
        "Array<" + parseElementsArray(type.elements).join(", ") + ">",
      ];
    }
    if (type.name === "Record") {
      type.elements = [
        "Record<" + parseElementsArray(type.elements).join(", ") + ">",
      ];
    }
  }
  return { type: type?.name, controlType: "null", elements: type?.elements };
};

const filteredProps = computed(() => {
  if (!props.docgenInfo?.props) {
    return null;
  }
  return props.docgenInfo.props.map((prop) => {
    // name	description	required	type	tags	defaultValue
    return {
      name: prop.name,
      description: prop.description,
      required: prop.required,
      // type: parseComponentDocProps(prop.type),
      type: _parseComponentDocProps(prop.type),
      tags: prop.tags,
      defaultValue: prop.defaultValue?.value,
    };
  });
});

const filteredSlots = computed(() => {
  if (!props.docgenInfo?.slots) {
    return null;
  }
  return props.docgenInfo.slots.map((slot) => {
    return {
      name: slot.name,
      description: slot.description,
      bindings: slot.bindings,
      scoped: slot.scoped,
      tags: slot.tags,
    };
  });
});

const mapSlotsWithTemplate = ([key, value]: [string, unknown]) => {
  return [
    key,
    () => {
      try {
        return h(
          defineComponent({
            template: value + "",
          }),
        );
      } catch (error) {
        return value;
      }
    },
  ];
};

const codePreview = computed(() => {
  const _props = { ...props.story.docs.render.args, ...query.controls };
  const _slots = {
    ...props.story.docs.render.slots,
    ...Object.fromEntries(
      Object.entries(JSON.parse(JSON.stringify(query.slots)))
        .filter(([_, val]) => val != null)
        .map(mapSlotsWithTemplate),
    ),
  };

  const propStr = Object.entries(_props)
    .map(([key, value]) => {
      let defaultValue = filteredProps.value?.find((a) => a.name === key)
        ?.defaultValue;
      if (defaultValue?.startsWith("'") && defaultValue?.endsWith("'")) {
        defaultValue = defaultValue.slice(1, -1);
      }
      console.log(
        `default value for ${key} is `,
        defaultValue,
        "found",
        value === undefined ? "undefined" : value,
      );
      if ((defaultValue == undefined && !value) || value === defaultValue) {
        return null;
      }
      if (typeof value === "object" && value != null) {
        return `\n  :${key}="${JSON.stringify(value).replaceAll('"', "`")}"`;
      }
      if (typeof value === "string") {
        return `\n  ${key}="${value}"`;
      }
      return `\n  :${key}="${value}"`;
    })
    .filter(Boolean)
    .join("");
  const defaultSlotContent = _slots?.default ?? "";
  const slots = _slots
    ? Object.entries(_slots)
        .map(([slot, content]) =>
          content == null ? null : `  <template #${slot}>${content}</template>`,
        )
        .filter(Boolean)
        .join("\n")
    : "";
  const slotContent =
    !defaultSlotContent && !slots
      ? "\n/>"
      : `>` +
        (defaultSlotContent ? `\n  ${defaultSlotContent}` : "") +
        slots +
        `\n</${props.docgenInfo.displayName}>`;
  return `<${[props.docgenInfo.displayName, propStr]
    .filter(Boolean)
    .join(" ")}${slotContent}`;
});

const Comp = computed(() => {
  if (!props.story) {
    return null;
  }
  const slots = Object.fromEntries(
    Object.entries(JSON.parse(JSON.stringify(query.slots)))
      .filter(([_, val]) => val != null)
      .map(mapSlotsWithTemplate),
  );
  const handleModels = Object.fromEntries(
    Object.entries(props.handleModels).map(([eventKey, controlKey]) => {
      return [
        eventKey,
        (v: unknown) => {
          query.controls[controlKey] = v;
        },
      ];
    }),
  );
  return props.story.docs.render.defaultRenderer({
    props: {
      ...props.story.docs.render.args,
      ...query.controls,
      ...handleModels,
    },
    slots: { ...props.story.docs.render.slots, ...slots },
  } as any);
});
</script>

<style>
.component-wrapper {
  padding: 3rem 2rem;
  border-radius: 1rem;
}
td {
  vertical-align: top;
}
.prose td pre {
  font-size: 0.875rem;
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 0;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}
</style>
