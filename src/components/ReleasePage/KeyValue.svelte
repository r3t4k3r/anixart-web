<script>
    import { Col, Row } from "sveltestrap";
    export let key;
</script>

<Row>
    <Col class="col-xxl-3 col-xl-3 col-lg-4 col-md-3 col-sm-4 col-12"><span class="key">{key}</span></Col>
    <Col class="col-xxl-9 col-xl-9 col-lg-8 col-md-9 col-sm-8 col-12">
        <span class="value">
            <slot></slot>
        </span>
    </Col>
</Row>

<style>
    .key {
        font-weight: bold;
        font-size: 22px;
        color: rgb(161, 161, 161);
    }
    .value {
        font-size: 22px;
        color: rgb(238, 238, 238);
    }
</style>
