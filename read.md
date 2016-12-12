 { path: '', component: AppComponent },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            title: 'Home List'
        }
    },

    { path: '**', component: HomeComponent }