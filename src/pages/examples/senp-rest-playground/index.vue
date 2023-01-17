<template>
  <SenpRestPlayground
    baseurl="https://crudify.app/api/user/iTduz8WS9Cug4-cH/SocialMediaSimple"
    :routes="[
      {
        path: '/validator',
        method: 'GET',
        title: 'Validator',
        pathParameters: {},
        body: null,
      },
      {
        path: '',
        method: 'GET',
        title: 'Get All',
        pathParameters: {},
        body: null,
      },
      {
        path: '',
        method: 'POST',
        title: 'Create One',
        pathParameters: {},
        body: {
          username: '',
          avatar: '',
          createdAt: '',
          media: [''],
          text: '',
        },
      },
      {
        path: '/:entityID',
        method: 'GET',
        title: 'Get One',
        pathParameters: {
          entityID: '1',
        },
        body: null,
      },
      {
        path: '',
        method: 'PUT',
        title: 'Update One',
        pathParameters: {},
        body: {
          username: '',
          avatar: '',
          createdAt: '',
          media: [''],
          text: '',
        },
      },
      {
        path: '/:entityID',
        method: 'DELETE',
        title: 'Delete One',
        pathParameters: {
          entityID: '1',
        },
        body: null,
      },
    ]"
    theme=""
  >
  </SenpRestPlayground>
</template>

<script setup lang="ts"></script>
