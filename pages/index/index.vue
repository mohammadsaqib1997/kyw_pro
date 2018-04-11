<template lang="pug">
    .content-wrapper
        .container-fluid
            //- Breadcrumbs
            ol.breadcrumb
                li.breadcrumb-item.active Dashboard
            
            .row
                .col-xl-3.col-sm-6.mb-3
                    .card.bg-primary.text-white.o-hidden.h-100
                        .card-body
                            .card-body-icon
                                i.fa.fa-fw.fa-comments
                            .mr-5
                                | 25 New Messages
                        nuxt-link.card-footer.text-white.small.z-1(to="/blank")
                            span View Details
</template>

<script>
export default {};
</script>