<template>
  <Row>
    <Col :xs="1" :lg="6"> . </Col>
    <Col :xs="22" :lg="12">
    
      <div class="host">
        <p>Backend Server: </p>
        <Input type="text" v-model="host" @on-blur="setHost" style="width:50%"></Input>
      </div>

      <br/>
      <Table :columns="columns" :data="data" @on-row-click="goDetail"></Table>
      <br/>

      <Form ref="form" :model="form" :rules="rule" label-position="left" :label-width="80">

        <FormItem label="Name" prop="name">
          <Input type="text" v-model="form.name">
          </Input>
        </FormItem>

        <FormItem label="Size" prop="size">
          <Input type="text" v-model="form.size">
          </Input>
        </FormItem>

        <FormItem label="Distance" prop="distance">
          <Input type="text" v-model="form.distance">
          </Input>
        </FormItem>

        <FormItem label="Ordinality" prop="ordinality">
          <Input type="text" v-model="form.ordinality">
          </Input>
        </FormItem>

        <FormItem label="Description" prop="description">
          <Input type="textarea" v-model="form.description">
          </Input>
        </FormItem>

        <Button type="primary" @click="submit()">Submit</Button>

      </Form>

    </Col>
    <Col :xs="1" :lg="6"> . </Col>
  </Row>


</template>

<script src="./Home.js"></script>

<style>
.host {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
