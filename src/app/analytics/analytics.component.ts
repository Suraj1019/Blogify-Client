import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  constructor(private postService: PostsService, private toastr: ToastrService) { }
  user: any = null;
  posts: any[] = [];
  loader: boolean = false;
  topBlog: any = null;
  totalViews = 0;
  uniqueVisitors: any[] = [];
  labels: any[] = []
  views: any[] = []
  visitors: any[] = []

  ngOnInit() {
    let userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    this.user.name = this.user.name.split(' ')[0];
    this.fetchPosts();
  }

  fetchPosts() {
    this.loader = true;
    this.postService.getPostByUserId(this.user?.userId).subscribe(
      res => {
        this.posts = res;
        this.loader = false;
        this.calculateData();
        this.calculateChartData();
        this.initChart();
      },
      err => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    )
  }

  calculateData() {
    this.posts.forEach((blog, i) => {
      this.totalViews += blog.views;

      blog.visitors.forEach((visitor: any) => {
        if (this.uniqueVisitors.indexOf(visitor) === -1)
          this.uniqueVisitors.push(visitor)
      })

      if (i === 0) {
        this.topBlog = blog;
      } else {
        if (this.topBlog !== null && this.topBlog.views < blog.views) {
          this.topBlog = blog;
        }
      }
    })
  }

  calculateChartData() {
    this.posts.forEach((post: any) => {
      this.labels.push(post.title);
      this.views.push(post.views);
      this.visitors.push(post.visitors.length);
    })
  }

  initChart() {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Views',
          data: this.views,
          borderWidth: 1
        },
        {
          label: 'Visitors',
          data: this.visitors,
          borderWidth: 1
        }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
}
